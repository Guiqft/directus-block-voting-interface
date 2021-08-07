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

        <v-button class="selection-button" @click="dialogOpen = true">
            Adicionar existente
        </v-button>

        <selection-dialog :open="dialogOpen" @close="dialogOpen = false" />
    </div>
</template>

<script lang="ts">
import { PropType, ref, inject, watch, onMounted } from "vue"
import { getItemByItemIDs } from "./utils"

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

        const dialogOpen = ref(false)
        const singlePropositionsIDs = ref([])
        const selection = ref([])

        watch(
            values,
            async (currentValues) => {
                try {
                    // getting propositions item by item
                    if (currentValues.proposicao) {
                        singlePropositionsIDs.value = await getItemByItemIDs(
                            currentValues.proposicao,
                            system
                        )
                    }
                } catch (e) {
                    console.error(e)
                }
            },
            { immediate: true }
        )

        const handleListInput = (changes: string[]) => {
            emit("input", changes)
        }

        return { handleListInput, dialogOpen }
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
