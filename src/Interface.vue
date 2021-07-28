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

        <v-button class="selection-button" @click="drawerOpen = true">
            Adicionar existente
        </v-button>
        test: {{ drawerOpen }}
        <drawer-collection
            collection="proposicoes"
            :active="drawerOpen"
            :multiple="true"
            :selection="selection"
            @input="testhandle"
        />
    </div>
</template>

<script lang="ts">
import { PropType, ref } from "vue"
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

        const drawerOpen = ref(false)
        const selection = ref([])

        const handleListInput = (changes: string[]) => {
            emit("input", changes)
        }

        const testhandle = (values: any[]) => {
            console.log(values)
        }

        // const values = inject("values") as Record<string, any>
        // watch(values, () => {
        //     console.log("--changing", values)
        // })

        return { handleListInput, drawerOpen, selection, testhandle }
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
