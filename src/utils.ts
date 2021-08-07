const checkForRelationIds = (proposicoes: any[]) => {
    return proposicoes.find((el) => typeof el === "number")
}

const checkForPropositionsObjects = (proposicoes: any[]) => {
    return proposicoes.find((el) => typeof el === "object")
}

const getSinglePropositionsIDs = async (idList: number[], system: any) => {
    const responseData = (
        await system.api.get("items/ordem_do_dia_proposicoes", {
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

export const getItemByItemIDs = async (propositions: any, system: any) => {
    const idList = []
    // If exists single propositions on item by item field
    // When m2m fields already has setted values, they came as single ID's for each field relation.
    // Although, when we select a new item, they came as objects with the item ID, not the relation ID.
    // So, if `checkForRelationIds` is true, we need to get these relations ID's and parse them.
    if (checkForRelationIds(propositions))
        idList.push(
            ...(await getSinglePropositionsIDs(
                propositions.filter((el: any) => typeof el === "number"),
                system
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
