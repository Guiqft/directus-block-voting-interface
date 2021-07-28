<template>
    <v-input :model-value="value" @update:model-value="handleInput" />
</template>

<script lang="ts">
import { onMounted, inject, watch } from "vue"
export default {
    emits: ["input"],
    props: {
        value: { type: String, required: true, default: null },
    },
    setup(props, { emit }) {
        const system = inject("system") as Record<string, any>
        const values = inject("values") as Record<string, any>

        const handleInput = (value: string) => {
            emit("input", value)
        }

        watch(values, () => {
            console.log("--changing", values)
        })

        onMounted(() => {
            console.log(values)
            console.log(system.useAppStore())
        })

        return { handleInput }
    },
}
</script>

<style lang="scss" scoped></style>
