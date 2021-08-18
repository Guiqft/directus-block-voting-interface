<template>
    <div class="status-select">
        <v-button
            v-if="!(primaryKey === '+')"
            @click="toggleOpen"
            :disabled="disabled || propositions.length === 0"
            :loading="loading"
        >
            Alterar status
            <v-icon v-if="isOpen" name="arrow_drop_up" />
            <v-icon v-else name="arrow_drop_down" />

            <template #loading><v-progress-circular indeterminate /></template>
        </v-button>

        <transition-expand>
            <v-list v-if="isOpen">
                <v-list-item
                    :key="idx"
                    v-for="(item, idx) in statusList"
                    @click="changePropositionStatus(item.value)"
                >
                    {{ item.title }}
                </v-list-item>
            </v-list>
        </transition-expand>
    </div>
</template>

<script lang="ts">
import { ref, inject, PropType } from "vue"
export default {
    emits: ["update"],
    props: {
        primaryKey: {
            type: String,
            required: true,
        },
        disabled: {
            type: Boolean,
            required: true,
        },
        propositions: {
            type: Array as PropType<any[]>,
            required: true,
        },
    },
    setup(props, { emit }) {
        const system = inject("system") as Record<string, any>

        const isOpen = ref(false)
        const loading = ref(false)

        const toggleOpen = () => {
            isOpen.value = !isOpen.value
        }

        const statusList = [
            {
                title: "Aguardando",
                value: "aguardando",
            },
            {
                title: "Em votação",
                value: "votacao",
            },
        ]

        const changePropositionStatus = async (newStatus: string) => {
            loading.value = true

            const propositionsIDs = props.propositions
                .filter((el) => typeof el === "object")
                .map((el) => el.proposicoes_id)

            const relationIDs = props.propositions.filter(
                (el) => typeof el === "number"
            )

            const relationsData = (
                await system.api.get("items/ordem_do_dia_proposicoes_1", {
                    params: { filter: { id: { _in: relationIDs } } },
                })
            ).data.data
            relationsData.map((proposition: any) =>
                propositionsIDs.push(proposition.proposicoes_id)
            )

            await system.api.patch("items/proposicoes", {
                keys: propositionsIDs,
                data: { status: newStatus },
            })

            loading.value = false
            emit("update")
        }

        return {
            isOpen,
            toggleOpen,
            statusList,
            changePropositionStatus,
            loading,
        }
    },
}
</script>

<style lang="scss" scoped>
.status-select {
    position: relative;
    margin-left: 7px;

    .v-list {
        position: absolute;
        background-color: var(--background-normal);
        width: 175px !important;
        min-width: 175px !important;
        padding: 3px 5px;

        .v-list-item {
            cursor: pointer;

            &:hover {
                background-color: var(--background-normal-alt);
            }
        }
    }
}
</style>
