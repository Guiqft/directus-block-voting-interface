const checkForRelationIds = (proposicoes: any[]) => {
    return proposicoes.find((el) => typeof el === "number")
}

const checkForPropositionsObjects = (proposicoes: any[]) => {
    return proposicoes.find((el) => typeof el === "object")
}

const getSinglePropositionsIDs = async (idList: number[], api: any) => {
    const responseData = (
        await api.get("items/ordem_do_dia_proposicoes", {
            params: {
                filter: {
                    id: {
                        _in: idList,
                    },
                },
            },
        })
    ).data.data

    return responseData.map((relation: any) => relation.proposicoes_id)
}

const removeArrayDuplicates = (arr: string[]) => {
    return arr.filter(function (value, index, array) {
        return array.indexOf(value) === index
    })
}

export const getItemByItemIDs = async (propositions: any, api: any) => {
    const idList = []
    // If exists single propositions on item by item field
    // When m2m fields already has setted values, they came as single ID's for each field relation.
    // Although, when we select a new item, they came as objects with the item ID, not the relation ID.
    // So, if `checkForRelationIds` is true, we need to get these relations ID's and parse them.
    if (checkForRelationIds(propositions))
        idList.push(
            ...(await getSinglePropositionsIDs(
                propositions.filter((el: any) => typeof el === "number"),
                api
            ))
        )

    if (checkForPropositionsObjects(propositions))
        idList.push(
            ...propositions
                .filter((el: any) => typeof el === "object")
                .map((el: any) => el.proposicoes_id)
        )

    return removeArrayDuplicates(idList)
}

export const getFilters = (propositions: any[]) => {
    const filter: any = {
        status: {
            _eq: "aguardando",
        },
    }

    if (propositions.length > 0) {
        filter.id = { _nin: propositions }
    }

    return filter
}

export const getSelectOptions = (validPropositions: any[]) => {
    const typeMap = {
        projetoexe: "Projeto do Executivo",
        projetoleg: "Projeto do Legislativo",
        requerimento: "Requerimento",
        indicacao: "Indica????o",
        mocao: "Mo????o",
        decreto: "Decreto Interno",
        emenda: "Emenda",
    } as Record<string, string>

    return validPropositions.map((el: any) => ({
        text: `${el.titulo} - ${el.numero} - ${typeMap[el.tipo as string]}`,
        value: { proposicoes_id: el.id },
    }))
}

export const conflictPropositions = async (
    values: Record<string, any>,
    api: any
) => {
    const newPropositionsItemByItemIDs = values.proposicao
        .filter((el: any) => typeof el === "object")
        .map((el: any) => el.proposicoes_id)

    const blockPropositionsIDs = await getBlockPropositionsIDs(
        values.proposicao_bloco,
        api
    )
    // if intersection length > 0, has conflicts between block and item by item
    return arrayIntersection(newPropositionsItemByItemIDs, blockPropositionsIDs)
}

const arrayIntersection = (array1: any[], array2: any[]) => {
    return array1.filter((value) => array2.includes(value))
}

export const getBlockPropositionsIDs = async (
    propositions: any[],
    api: any
) => {
    let blockPropositionsIDs = [] as any[]
    if (propositions) {
        if (checkForRelationIds(propositions)) {
            const responseData = (
                await api.get("items/ordem_do_dia_proposicoes_1", {
                    params: {
                        filter: {
                            id: {
                                _in: propositions.filter(
                                    (el: any) => typeof el === "number"
                                ),
                            },
                        },
                    },
                })
            ).data.data

            blockPropositionsIDs.push(
                ...responseData.map((relation: any) => relation.proposicoes_id)
            )
        }

        if (checkForPropositionsObjects(propositions)) {
            blockPropositionsIDs.push(
                ...propositions
                    .filter((el: any) => typeof el === "object")
                    .map((el: any) => el.proposicoes_id)
            )
        }

        blockPropositionsIDs = removeArrayDuplicates(blockPropositionsIDs)
    }

    return blockPropositionsIDs
}
