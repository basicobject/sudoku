<template>
    <div class="flex border border-grid-gray w-10 h-10 justify-center items-center font-normal text-2xl"
            :class="{ 'text-th-black' : original, 'text-primary': !original, 'border-r-2': rightBoundary, 'border-b-2': bottomBoundary, 'bg-th-gray': highlight}"
            tabindex="0"
        @click.stop="handleClick"
        @mouseout.stop="handleMouseOut"
        @keyup.stop="catchDigit"
        >
        {{ value }}
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue"

    const ValidKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]

    interface CellProps {
        value: number | null,
        x: number,
        y: number,
        highlight: boolean,
        illegal?: boolean,
        original: boolean
    }

    const props = defineProps<CellProps>()
    const emit  = defineEmits(['change-digit', 'set-highlight', 'unset-highlight'])

    const rightBoundary = (props.y != 8) && ((props.y + 1) % 3 == 0)
    const bottomBoundary = (props.x != 8) && ((props.x + 1) % 3 == 0)
    const isEditable = ref(false)

    const toggleEdit = () => {
        if (!props.original) {
            isEditable.value = !isEditable.value
        }
    }

    const handleClick = () => {
        toggleEdit()
        emit("set-highlight", props.x, props.y)

    }

    const handleMouseOut = () => {
        if(isEditable.value) {
            isEditable.value = false
        }
        emit("unset-highlight", props.x, props.y)
    }

    const catchDigit = (e: KeyboardEvent) => {
        if(isEditable.value) {
            if(ValidKeys.includes(e.key)) {
                const digit = e.keyCode - '0'.charCodeAt(0)
                emit('change-digit', digit, props.x, props.y)
            }
        }
    }
</script>