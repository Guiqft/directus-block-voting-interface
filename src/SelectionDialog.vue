<template>
    <v-dialog
        :model-value="open"
        @update:model-value="emitClose"
        @esc="emitClose"
    >
        <v-sheet>
            <h2>Selecione uma proposição para adicionar ao bloco:</h2>
            <p v-if="options.length === 0">Não há proposições disponíveis</p>
            <v-select
                :model-value="selection"
                @update:modelValue="handleSelection"
                :items="options"
                :disabled="options.length === 0"
                multiple
            />

            <div class="action-buttons">
                <v-button class="cancel-button" @click="emitClose">
                    Cancelar
                </v-button>

                <v-button
                    class="save-button"
                    :disabled="!(selection.length > 0)"
                    @click="emitSelection"
                >
                    Salvar
                </v-button>
            </div>
        </v-sheet>
    </v-dialog>
</template>

<script lang="ts">
import { PropType, ref } from "vue"

interface ISelectionItem {
    text: string
    value: string
}

export default {
    emits: ["input", "close"],
    props: {
        open: { type: Boolean, default: false, required: true },
        options: {
            type: Array as PropType<ISelectionItem[]>,
            required: true,
        },
    },
    setup(props, { emit }) {
        const selection = ref([])

        const handleSelection = (selectedItems: any[]) => {
            selection.value = selectedItems
        }

        const emitSelection = () => {
            emit("input", selection.value)
            emitClose()
        }

        const emitClose = () => {
            selection.value = []
            emit("close")
        }

        return { selection, emitClose, handleSelection, emitSelection }
    },
}
</script>

<style lang="scss" scoped>
.v-sheet {
    width: 500px;
    h2 {
        margin-bottom: 25px;
    }

    p {
        color: var(--warning);
    }

    .action-buttons {
        display: flex;
        justify-content: space-between;
        margin: 30px 0px;

        .save-button {
            --v-button-background-color-disabled: var(--background-normal-alt);
        }

        .cancel-button {
            --v-button-background-color: var(--red);
            --v-button-background-color-hover: var(--red-75);
            --v-button-color: #d9c5c5;
            --v-button-color-hover: #d9c5c5;
        }
    }
}
</style>
