<template>
    <template v-if="value">
        <div class="flex border border-th-gray w-10 h-10 justify-center items-center font-normal text-2xl"
                :class="{ 'text-th-black' : original, 'text-primary': !original, 'border-r-2': rightBoundary, 'border-b-2': bottomBoundary, 'bg-th-gray': highlight, 'text-th-danger': illegal, 'bg-selected': selected}"
            @click.stop="handleClick"
            @mouseout.stop="handleMouseOut"
            >
            {{ value }}
        </div>
    </template>
    <template v-else>
        <div class="flex border border-th-gray w-10 h-10 justify-center items-center font-normal text-xs"
                :class="{ 'text-th-black' : original, 'text-primary': !original, 'border-r-2': rightBoundary, 'border-b-2': bottomBoundary, 'bg-th-gray': highlight, 'text-th-danger': illegal, 'bg-selected': selected}"
            @click.stop="handleClick"
            @mouseout.stop="handleMouseOut"
            >
            {{ possibles }}
        </div>
    </template>
</template>

<script setup lang="ts">

    interface CellProps {
        value: number | null,
        x: number,
        y: number,
        highlight: boolean,
        illegal: boolean,
        original: boolean,
        selected: boolean,
        possibles: string,
    }

    const props = defineProps<CellProps>()
    const emit  = defineEmits(['set-highlight', 'unset-highlight'])

    const rightBoundary = (props.y != 8) && ((props.y + 1) % 3 == 0)
    const bottomBoundary = (props.x != 8) && ((props.x + 1) % 3 == 0)

    const handleClick = (e: MouseEvent) => {
        if(e.ctrlKey) {
            emit("set-highlight", props.x, props.y, true)
        } else {
            emit("set-highlight", props.x, props.y, false)
        }
    }

    const handleMouseOut = () => {
        emit("unset-highlight", props.x, props.y)
    }
</script>