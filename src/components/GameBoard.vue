<template>
    <div @click.self="clearFocus()">
        <div class="outline-none -mt-[120px] w-fit mx-auto border rounded-lg overflow-hidden border-grid-gray" @keyup.stop="catchDigit" tabindex="0">
            <div class="flex basis-9 justify-center bg-th-white" v-for="row in gameGrid.grid">
                <div v-for="cell in row">
                    <SingleCell :x="cell.x" :y="cell.y" :value="cell.value" :original="cell.original" :highlight="cell.highlight" :illegal="cell.illegal" :focus="cell.focus" :possibles="possiblesAsStr(cell.possibles)"
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
    </div>
</template>

<script setup lang="ts">
    import { Sudoku, Coin } from "../composables/SudokuGame";
    import { ref } from "vue";
    import SingleCell from "./SingleCell.vue";
    import DefaultButton from "./DefaultButton.vue";
    import router from "../router";

    const ValidKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]

    interface gameProps {
        quit: boolean,
        restart: boolean
    }

    const game: Sudoku = new Sudoku("easy")

    const possiblesAsStr = (possibles: Coin[]) => {
        return possibles.join("")
    }

    const gameGrid = ref(game)

    const validateBoard = () => {
        const completed = gameGrid.value.validate()

        if (completed) {
            alert("Congratulation!")
        }
    }

    const setHighlight = (i: number, j: number) => {
        gameGrid.value.setFocus(i, j)
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

    const clearFocus = () => {
        gameGrid.value.clearFocus()
    }

    const catchDigit = (e: KeyboardEvent) => {
        const digit = e.keyCode - '0'.charCodeAt(0)

        if(ValidKeys.includes(e.key)) {
            if(e.ctrlKey) {
                gameGrid.value.setPossiblesInFocus(digit)
            } else {
                gameGrid.value.setCellsInFocus(digit);
                validateBoard();
            }

            setTimeout(() => gameGrid.value.clearFocus(), 500);
        }

        if(e.keyCode === 27) {
            gameGrid.value.clearFocus();
        }
    }
</script>