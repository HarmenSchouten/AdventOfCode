import { Grid2D } from "../../utils/grid2d.ts";
import "../../utils/index.ts"
const input = await Deno.readTextFile(new URL("./input.txt", import.meta.url));

const grid = new Grid2D(input, s => s)

let tachyons = new Set<number>()
tachyons.add(grid.find(x => x.y === 0 && x.value === "S")!.x)

let splits = 0;

for (let y = 1; y < grid.height - 1; y++) {
    const newTachyons = new Set<number>()
    tachyons.forEach(x => {
        if (grid.get(x, y).value === '^') {
            splits++
            if (x > 0) newTachyons.add(x - 1)
            if (x < grid.width - 1) newTachyons.add(x + 1)
        } else newTachyons.add(x)
    })
    tachyons = newTachyons
}

console.log(splits)