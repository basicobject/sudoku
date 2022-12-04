export type Indexes = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type Coin = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | null;

export interface Cell {
  value: Coin;
  highlight: boolean;
  illegal: boolean;
  possibles: Coin[];
  x: Indexes;
  y: Indexes;
  original: boolean;
  selected: boolean;
}

export type Grid = Cell[][];

type Difficulty = "easy" | "medium" | "hard";

export class Sudoku {
  readonly difficulty: Difficulty;
  readonly grid: Grid;

  constructor(difficulty: Difficulty) {
    this.difficulty = difficulty;
    this.grid = this.newEmptyGrid();
    this.initGrid();
  }

  private initGrid(): void {
    let fillRate: number;

    if (this.difficulty === "easy") fillRate = 90;
    else if (this.difficulty === "medium") fillRate = 80;
    else fillRate = 70;

    let indices = [];

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        indices.push([i, j]);
      }
    }

    indices = this.shuffle(indices);
    const adder = Math.floor(Math.random() * 1000);

    indices.forEach((pair) => {
      const i = pair[0];
      const j = pair[1];

      const r: number = Math.floor(Math.random() * 100);

      if (r < fillRate) {
        // set cell as original value
        this.fillCell(i, j, adder);
        this.grid[i][j].original = true;
      }
    });

    this.reset();
  }

  // contains recursion and a possible infinite loop
  private fillCell(i: Indexes, j: Indexes, adder: number): void {
    this.grid[i][j].value = this.digitSum(
      (this.grid[i][j].value as number) + adder
    );
  }

  setSelectedCells(digit: Coin) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (!this.grid[i][j].original && this.grid[i][j].selected) {
          this.grid[i][j].value = digit;
          this.grid[i][j].possibles = [];
        }
      }
    }
  }

  setPossiblesInSelectedCells(digit: Coin) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (!this.grid[i][j].original && this.grid[i][j].selected) {
          if (!this.grid[i][j].possibles.includes(digit)) {
            this.grid[i][j].possibles.push(digit);
          } else {
            const index = this.grid[i][j].possibles.indexOf(digit);
            this.grid[i][j].possibles.splice(index, 1);
          }

          this.grid[i][j].possibles = this.grid[i][j].possibles.sort();
          this.grid[i][j].value = null;
        }
      }
    }
  }

  private digitSum(num: number): Coin {
    let sum = 0;
    while (num > 0) {
      sum += num % 10;
      num = Math.floor(num / 10);
    }

    if (sum > 9) return this.digitSum(sum);
    else return sum as Coin;
  }

  clearSelected() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.grid[i][j].selected) {
          this.grid[i][j].selected = false;
        }
      }
    }
  }

  setSelection(i: Indexes, j: Indexes) {
    if (!this.grid[i][j].original) {
      this.grid[i][j].selected = true;
    }
  }

  markRowsAndCols(flag: boolean, i: Indexes, j: Indexes) {
    for (let k = 0; k < 9; k++) {
      this.grid[i][k].highlight = flag;
      this.grid[k][j].highlight = flag;
    }
  }

  reset(): void {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (!this.grid[i][j].original) {
          this.grid[i][j].value = null;
        }
      }
    }
  }

  validate(): boolean {
    let full = true;
    let valid = true;

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        this.grid[i][j].illegal = false;
        if (this.grid[i][j].value) {
          const check =
            this.validateRow(i, j, true) &&
            this.validateColumn(i, j, true) &&
            this.validateSquare(i, j, true);
          if (!check) {
            valid = false;
          }
        } else {
          full = false;
        }
      }
    }

    return full && valid;
  }

  private markAsIllegal(i: Indexes, j: Indexes): void {
    if (!this.grid[i][j].original) {
      this.grid[i][j].illegal = true;
    }
  }

  private validateRow(i: Indexes, j: Indexes, mark = false): boolean {
    const v = this.grid[i][j].value;
    let valid = true;

    for (let k = 0; k < 9; k++) {
      if (k !== j && this.grid[i][k].value === v) {
        valid = false;
        mark && this.markAsIllegal(i, k);
      }
    }

    if (!valid) {
      mark && this.markAsIllegal(i, j);
    }

    return valid;
  }

  private validateColumn(i: Indexes, j: Indexes, mark = false): boolean {
    const v = this.grid[i][j].value;
    let valid = true;

    for (let k = 0; k < 9; k++) {
      if (k !== i && this.grid[k][j].value === v) {
        valid = false;
        mark && this.markAsIllegal(k, j);
      }
    }

    if (!valid) {
      mark && this.markAsIllegal(i, j);
    }

    return valid;
  }

  private validateSquare(i: Indexes, j: Indexes, mark = false): boolean {
    const v = this.grid[i][j].value;
    let valid = true;
    const p0 = Math.floor(i / 3) * 3;
    const q0 = Math.floor(j / 3) * 3;

    for (let p = 0; p < 3; p++) {
      const px = p0 + p;
      for (let q = 0; q < 3; q++) {
        const qx = q0 + q;
        if (px !== i && qx !== j && this.grid[px][qx].value === v) {
          valid = false;
          mark && this.markAsIllegal(px, qx);
        }
      }
    }

    if (!valid) {
      mark && this.markAsIllegal(i, j);
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
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  private newEmptyGrid(): Grid {
    const SeedSolution = [
      [4, 3, 5, 2, 6, 9, 7, 8, 1],
      [6, 8, 2, 5, 7, 1, 4, 9, 3],
      [1, 9, 7, 8, 3, 4, 5, 6, 2],
      [8, 2, 6, 1, 9, 5, 3, 4, 7],
      [3, 7, 4, 6, 8, 2, 9, 1, 5],
      [9, 5, 1, 7, 4, 3, 6, 2, 8],
      [5, 1, 9, 3, 2, 6, 8, 7, 4],
      [2, 4, 8, 9, 5, 7, 1, 3, 6],
      [7, 6, 3, 4, 1, 8, 2, 5, 9],
    ];
    const grid = Array(9)
      .fill(null)
      .map((_, i) =>
        Array(9)
          .fill(null)
          .map((_, j) => {
            return {
              value: SeedSolution[i][j] as Coin,
              highlight: false,
              illegal: false,
              possibles: [],
              x: i,
              y: j,
              original: false,
              selected: false,
            } as Cell;
          })
      );

    return grid;
  }
}
