<template>
    <div class="-mt-[120px] w-fit mx-auto border rounded-lg overflow-hidden border-grid-gray">
        <div class="flex basis-9 justify-center bg-th-white" v-for="row in gameGrid.grid">
            <div v-for="cell in row">
                <SingleCell :x="cell.x" :y="cell.y" :value="cell.value" :original="cell.original" :highlight="cell.highlight" :illegal="cell.illegal"
                    @change-digit="handleChangeDigit"
                    @set-highlight="setHighlight"
                    @unset-highlight="unsetHighlight"
                    />
            </div>
        </div>
    </div>
    <div class="flex gap-4 pt-14 justify-center">
        <DefaultButton @click="restartGame">Restart</DefaultButton>
        <DefaultButton @click="stopGame">Stop</DefaultButton>
    </div>
</template>

<script setup lang="ts">
    import { Sudoku } from "../composables/SudokuGame";
    import { ref } from "vue";
    import SingleCell from "./SingleCell.vue";
    import DefaultButton from "./DefaultButton.vue";
    import router from "../router";

    interface gameProps {
        quit: boolean,
        restart: boolean
    }

    const game: Sudoku = new Sudoku("easy")

    const gameGrid = ref(game)

    const handleChangeDigit = (digit: number, x: number, y: number) => {
        gameGrid.value.setCell(x, y, digit)
        const completed = gameGrid.value.validate()
        if (completed) {
            alert("Congratulation!")
        }
    }

    const setHighlight = (i: number, j: number) => {
        gameGrid.value.markRowsAndCols(true, i, j)
    }

    const unsetHighlight = (i: number, j: number) => {
        gameGrid.value.markRowsAndCols(false, i, j)
    }

    const restartGame = () => {
        const yes = confirm("Do you want to restart the game?")
        if(yes) {
            gameGrid.value.reset()
        }
    }

    const stopGame = () => {
        const yes = confirm("You will lose the progress! Do you want to stop the game?")
        if (yes) {
            router.push({ name: 'HomePage'})
        }
    }

</script>