<template>
    <interface-list-m2m
        collection="ordem_do_dia"
        field="proposicao_bloco"
        :enableSelect="false"
        :value="value"
        @input="handleListInput"
    />
</template>

<script lang="ts">
import { PropType } from "vue"
export default {
    emits: ["input"],
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
        // const system = inject("system") as Record<string, any>
        const handleListInput = (changes: string[]) => {
            emit("input", changes)
        }

        // const values = inject("values") as Record<string, any>
        // watch(values, () => {
        //     console.log("--changing", values)
        // })

        return { handleListInput }
    },
}
</script>

<style lang="scss" scoped></style>
