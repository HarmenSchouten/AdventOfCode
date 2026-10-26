import { Grid2D } from "../../utils/grid2d.ts";
import "../../utils/index.ts"
const input = await Deno.readTextFile("./Day25/input.txt");

const parsed = input
    .splitDlb()
    .reduce((acc, lines) => {
        const grid = new Grid2D<string>(lines)

        const isLock = grid
            .filter(item => item.y === 0)
            .every(item => item.value === "#")

        const columns = [] as number[]
        for (let x = 0; x < grid.width; x++) {
            if (isLock) columns.push(grid.findInColumn(x, item => item.value === ".")?.y ?? -1)
            else columns.push(grid.findInColumn(x, item => item.value === "#")?.y ?? -1)
        }

        acc.push({isLock, columns})

        return acc;
    }, [] as {isLock: boolean, columns: number[]}[])

const result = parsed
    .filter(item => item.isLock)
    .reduce((acc, lock) => {
        const key = parsed.filter(item => 
            !item.isLock 
            && item.columns.every((column, index) => column - lock.columns[index] >= 0))
        
        acc += key.length

        return acc;
    }, 0)

console.log(result)