import { Grid2D } from "../utils/grid2d.ts";
import "../utils/index.ts"
const input = await Deno.readTextFile("./day18/input.txt")

const grid = new Grid2D<string>(input)

const isCorner = (x: number, y: number) => {
    return (x === 0 && y === 0)
        || (x === grid.width - 1 && y === 0)
        || (x === grid.width - 1 && y === grid.height - 1)
        || (x === 0 && y === grid.height - 1)
}

for (let i = 0; i < 100; i++) {
    const onCells = grid.filter(x => {
        if (x.value !== "#") return false;
        const neighbourCnt = x.getAllNeighbours(false, c => c.value === "#" || isCorner(c.x, c.y)).length
        return (neighbourCnt === 3 || neighbourCnt === 2)
    }).concat(
        grid.filter(x => {
        if (x.value !== '.') return false;
        const neighbourCnt = x.getAllNeighbours(false, c => c.value === "#" || isCorner(c.x, c.y)).length
        return neighbourCnt === 3
    }))

    for (let x = 0; x < grid.width; x++) {
        for (let y = 0; y < grid.height; y++) {
            const isOn = onCells.find(c => c.x === x && c.y === y) || isCorner(x, y)
            grid.set(x, y, isOn ? '#' : '.')
        }
    }
}

console.log(grid.filter(x => x.value === '#').length)