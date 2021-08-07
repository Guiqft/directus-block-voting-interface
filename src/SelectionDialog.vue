<template>
    <p>TESTE {{ open }}</p>
    <v-dialog
        :model-value="open"
        @update:model-value="emitClose"
        @esc="emitClose"
    >
        <v-sheet>
            <h2>Selecione uma proposição para adicionar ao bloco:</h2>
            <v-select :model-value="selection" />
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
    props: {
        open: { type: Boolean, default: false, required: true },
        options: {
            type: Array as PropType<ISelectionItem[]>,
            required: true,
        },
    },
    setup(props, { emit }) {
        const selection = ref([])
        const emitClose = () => {
            emit("close")
        }

        return { selection, emitClose }
    },
}
</script>

<style lang="scss" scoped>
.v-sheet {
    width: 500px;
    h2 {
        margin-bottom: 25px;
    }
}
</style>
