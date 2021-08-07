<template>
    <div class="block-voting">
        <interface-list-m2m
            collection="ordem_do_dia"
            field="proposicao_bloco"
            :enableSelect="false"
            :value="value"
            @input="handleListInput"
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
import { getFilters, getItemByItemIDs, getSelectOptions } from "./utils"

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

        const selectionOptions = ref([])

        watch(
            values,
            async (currentValues) => {
                loading.value = true
                try {
                    // getting propositions item by item
                    if (currentValues.proposicao) {
                        singlePropositionsIDs.value = await getItemByItemIDs(
                            currentValues.proposicao,
                            system
                        )
                    }

                    const avaiablePropositions = (
                        await system.api.get("items/proposicoes", {
                            params: {
                                filter: getFilters(singlePropositionsIDs.value),
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

        return { handleInput, dialogOpen, selectionOptions, loading }
    },
}
</script>

<style lang="scss">
.block-voting {
    .selection-button {
        position: absolute;
        transform: translateY(-44px) translateX(147px);
    }
}
</style>
