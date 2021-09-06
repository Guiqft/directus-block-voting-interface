<template>
    <div class="block-voting">
        <div class="errors" v-if="invalidPropositions.length > 0">
            <p>
                As seguintes proposições não podem aparecer na votação por item
                e bloco ao mesmo tempo:
            </p>
            <render-template
                :key="proposition.id"
                v-for="proposition in invalidPropositions"
                collection="proposicoes"
                :item="proposition"
                :template="`{{titulo}} - {{numero}} - {{tipo}}`"
            />
        </div>

        <interface-list-m2m
            :key="update"
            collection="ordem_do_dia"
            field="proposicao_bloco"
            :enableSelect="false"
            :value="value"
            @input="$emit('input', $event)"
            :template="`{{proposicoes_id.status}} - {{proposicoes_id.titulo}} - {{proposicoes_id.numero}} - {{proposicoes_id.tipo}}`"
        />

        <div class="action-buttons">
            <v-button @click="dialogOpen = true" :disabled="loading">
                Adicionar existente
            </v-button>
            <status-select
                :propositions="value"
                :primaryKey="primaryKey"
                :disabled="loading || invalidPropositions.length > 0"
                @update="forceUpdate()"
            />
        </div>

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
import StatusSelect from "./StatusSelect.vue"

export default {
    emits: ["input"],
    components: { SelectionDialog, StatusSelect },
    props: {
        value: {
            type: Array as PropType<
                (number | string | Record<string, any>)[] | null
            >,
            required: true,
            default: null,
        },
        primaryKey: {
            type: String,
        },
    },
    setup(props, { emit }) {
        const api = inject("api") as Record<string, any>
        const values = inject("values") as Record<string, any>

        const loading = ref(false)
        const dialogOpen = ref(false)
        const singlePropositionsIDs = ref([])
        const invalidPropositions = ref([])
        const update = ref(false)

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
                            api
                        )

                        const conflictIDs = await conflictPropositions(
                            currentValues,
                            api
                        )

                        if (conflictIDs.length > 0) {
                            const responseData = (
                                await api.get("items/proposicoes", {
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
                                (e: any) => ({
                                    id: e.id,
                                    status: e.status,
                                    titulo: e.titulo,
                                    tipo: e.tipo,
                                    numero: e.numero,
                                })
                            )
                        } else {
                            invalidPropositions.value = []
                        }
                    }

                    const avaiablePropositions = (
                        await api.get("items/proposicoes", {
                            params: {
                                filter: getFilters([
                                    ...singlePropositionsIDs.value,
                                    ...(await getBlockPropositionsIDs(
                                        currentValues.proposicao_bloco,
                                        api
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
            emit("input", [...(props.value || []), ...propositions])
        }

        const forceUpdate = () => {
            update.value = !update.value
        }

        return {
            handleInput,
            dialogOpen,
            selectionOptions,
            loading,
            invalidPropositions,
            update,
            forceUpdate,
        }
    },
}
</script>

<style lang="scss">
.block-voting {
    .action-buttons {
        position: absolute;
        transform: translateY(-44px) translateX(147px);
        display: flex;
        flex-direction: row;
        z-index: 4;
    }

    .errors {
        margin-bottom: 35px;
        p {
            color: var(--warning);
        }

        .render-template {
            margin: 3px 0px;
        }
    }
}
</style>
