export type Indexes = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
export type Coin = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | null

export interface Cell {
    value: Coin,
    highlight: boolean,
    illegal: boolean,
    possibles: Coin[],
    x: Indexes,
    y: Indexes,
    original: boolean,
}

export type Grid = Cell[][];

type Difficulty = "easy" | "medium" | "hard"

function newGrid(): Grid {
    const grid = Array(9).fill(null).map((_, i) => Array(9).fill(null).map((_, j) => {
        return {
            value: null,
            highlight: false,
            illegal: false,
            possibles: [],
            x: i,
            y: j,
            original: false
        } as Cell;
    }))

    grid[0][0].value = 1;
    grid[0][0].original = true;
    grid[3][3].value = 9;
    grid[3][3].original = true;
    console.table(grid[0][0])
    return grid;
}

export class Sudoku {
    readonly difficulty: Difficulty
    readonly grid: Grid

    constructor(difficulty: Difficulty) {
        this.difficulty = difficulty
        this.grid = newGrid()
    }

    setCell(i: Indexes, j: Indexes, digit: Coin) {
        this.grid[i][j].value = digit
    }

    markRowsAndCols(flag: boolean, i: Indexes, j: Indexes) {
        for (let k = 0; k < 9; k++ ) {
            this.grid[i][k].highlight = flag
            this.grid[k][j].highlight = flag
        }
    }
}
