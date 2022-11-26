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

    return grid;
}

export class Sudoku {
    readonly difficulty: Difficulty
    readonly grid: Grid

    constructor(difficulty: Difficulty) {
        this.difficulty = difficulty
        this.grid = newGrid()
        this.initGrid()
    }

    initGrid(): void {
        let fillRate: number = 100

        if (this.difficulty === "easy") fillRate = 90;
        else if (this.difficulty === "medium") fillRate = 80;
        else fillRate = 70;

        let indices = []

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                indices.push([i, j])
            }
        }

        indices = this.shuffle(indices);

        indices.forEach((pair) => {
            let i = pair[0]
            let j = pair[1]

            const r: number = Math.round(Math.random() * 100)
            let fillValue: number | null = Math.round(Math.random() * 10) % 10

            if (fillValue === 0) {
                fillValue = null
            }

            if ((r < fillRate) && (r > 0)) {
                // set cell
                this.grid[i][j].value = fillValue as Coin
                this.grid[i][j].original = true

                const valid = this.validateRow(i, j) && this.validateColumn(i, j) && this.validateSquare(i,j)
                // unset if invalid
                if(!valid) {
                    this.grid[i][j].value = null as Coin
                    this.grid[i][j].original = false
                }
            }
        });
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

    reset(): void {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if(!this.grid[i][j].original) {
                    this.grid[i][j].value = null
                }
            }
        }
    }

    validate(): void {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                this.grid[i][j].illegal = false
                if(!this.grid[i][j].value) {
                    console.log("Please fill the grid")
                } else {
                    (this.validateRow(i, j, true) && this.validateColumn(i, j, true) && this.validateSquare(i, j, true))
                }
            }
        }
    }

    private markAsIllegal(i: Indexes, j: Indexes): void {
        if (!this.grid[i][j].original) {
            this.grid[i][j].illegal = true
        }
    }

    validateRow(i: Indexes, j: Indexes, mark: boolean = false): boolean {
        const v = this.grid[i][j].value
        let valid = true

        for (let k=0; k < 9; k++) {
            if ((k !== j) && (this.grid[i][k].value === v)) {
                valid = false
                mark && this.markAsIllegal(i, k)
            }
        }

        if (!valid) {
            mark && this.markAsIllegal(i, j)
        }

        return valid;
    }

    validateColumn(i: Indexes, j: Indexes, mark: boolean = false): boolean {
        const v = this.grid[i][j].value
        let valid = true

        for (let k = 0; k < 9; k++) {
            if ((k !== i) && (this.grid[k][j].value === v)) {
                valid = false
                mark && this.markAsIllegal(k, j)
            }
        }

        if (!valid) {
            mark && this.markAsIllegal(i, j)
        }

        return valid;
    }

    validateSquare(i: Indexes, j: Indexes, mark: boolean = false): boolean {
        const v = this.grid[i][j].value
        let valid = true
        let p0 = Math.floor(i / 3) * 3 ;
        let q0 = Math.floor(j / 3) * 3 ;

        for (let p = 0; p < 3; p++) {
            let px = p0 + p
            for (let q = 0; q < 3; q++) {
                let qx = q0 + q
                if((px !== i) && (qx !== j) && (this.grid[px][qx].value === v)) {
                    valid = false
                    mark && this.markAsIllegal(px, qx)
                }
            }
        }

        if (!valid) {
            mark && this.markAsIllegal(i, j)
        }

        return valid;
    }

    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    private shuffle<T>(array: T[]) {
        let currentIndex = array.length;
        let randomIndex: number;

        // While there remain elements to shuffle.
        while (currentIndex !== 0) {

          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }

        return array;
    }
}
