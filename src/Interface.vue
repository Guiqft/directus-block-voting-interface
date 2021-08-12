<template>
    <div class="block-voting">
        <div class="errors" v-if="invalidPropositions.length > 0">
            <p>
                As seguintes proposições não podem aparecer na votação por item
                e bloco ao mesmo tempo:
            </p>
            <li
                class="proposition-number"
                :key="idx"
                v-for="(proposition, idx) in invalidPropositions"
            >
                {{ proposition.number }}
            </li>
        </div>

        <interface-list-m2m
            collection="ordem_do_dia"
            field="proposicao_bloco"
            :enableSelect="false"
            :value="value"
            @input="$emit('input', $event)"
            :template="`{{proposicoes_id.status}} - {{proposicoes_id.titulo}} - {{proposicoes_id.numero}}`"
        />

        <v-button
            class="selection-button"
            @click="dialogOpen = true"
            :disabled="loading"
        >
            Adicionar existente
        </v-button>

        <selection-dialog
            :open="dialogOpen"
            :options="selectionOptions"
            @input="handleInput($event)"
            @close="dialogOpen = false"
        />
    </div>
</template>

<script lang="ts">
import { PropType, ref, inject, watch } from "vue"
import {
    conflictPropositions,
    getBlockPropositionsIDs,
    getFilters,
    getItemByItemIDs,
    getSelectOptions,
} from "./utils"

import SelectionDialog from "./SelectionDialog.vue"

export default {
    emits: ["input"],
    components: { SelectionDialog },
    props: {
        value: {
            type: Array as PropType<
                (number | string | Record<string, any>)[] | null
            >,
            required: true,
            default: null,
        },
    },
    setup(props, { emit }) {
        const system = inject("system") as Record<string, any>
        const values = inject("values") as Record<string, any>

        const loading = ref(false)
        const dialogOpen = ref(false)
        const singlePropositionsIDs = ref([])
        const invalidPropositions = ref([])

        const selectionOptions = ref([])

        watch(
            values,
            async (currentValues) => {
                loading.value = true
                try {
                    if (currentValues.proposicao) {
                        // getting propositions item by item
                        singlePropositionsIDs.value = await getItemByItemIDs(
                            currentValues.proposicao,
                            system
                        )

                        const conflictIDs = await conflictPropositions(
                            currentValues,
                            system
                        )

                        if (conflictIDs.length > 0) {
                            const responseData = (
                                await system.api.get("items/proposicoes", {
                                    params: {
                                        filter: {
                                            id: {
                                                _in: conflictIDs,
                                            },
                                        },
                                    },
                                })
                            ).data.data

                            invalidPropositions.value = responseData.map(
                                (e: any) => ({ id: e.id, number: e.numero })
                            )
                        } else {
                            invalidPropositions.value = []
                        }
                    }

                    const avaiablePropositions = (
                        await system.api.get("items/proposicoes", {
                            params: {
                                filter: getFilters([
                                    ...singlePropositionsIDs.value,
                                    ...(await getBlockPropositionsIDs(
                                        currentValues.proposicao_bloco,
                                        system
                                    )),
                                ]),
                            },
                        })
                    ).data.data

                    selectionOptions.value =
                        getSelectOptions(avaiablePropositions)
                } catch (e) {
                    console.error(e)
                }

                loading.value = false
            },
            { immediate: true }
        )

        const handleInput = (propositions: any[]) => {
            emit("input", [...props.value, ...propositions])
        }

        return {
            handleInput,
            dialogOpen,
            selectionOptions,
            loading,
            invalidPropositions,
        }
    },
}
</script>

<style lang="scss">
.block-voting {
    .selection-button {
        position: absolute;
        transform: translateY(-44px) translateX(147px);
    }

    .errors {
        margin-bottom: 35px;
        p {
            color: var(--warning);
        }

        li {
            margin-left: 40px;
        }
    }
}
</style>
