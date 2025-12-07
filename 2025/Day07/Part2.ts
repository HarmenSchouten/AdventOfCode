import { Grid2D } from "../utils/grid2d.ts";
import "../utils/index.ts"
const input = await Deno.readTextFile("Day07/input.txt");

const grid = new Grid2D(input, s => s)

const tachyons = new Map<number, number>()

const start = grid.find(x => x.y === 0 && x.value === "S")

tachyons.set(start!.x, 1)

for (let y = 1; y < grid.height; y++) {
    for (let x = 0; x < grid.width; x++) {
        if (grid.get(x, y).value === '^') {
            const current = tachyons.get(x) ?? 0
            tachyons.delete(x)
            tachyons.set(x - 1, current + (tachyons.get(x - 1) ?? 0))
            tachyons.set(x + 1, current + (tachyons.get(x + 1) ?? 0))
        }
    }
}
console.log(tachyons.entries().reduce((a, [, v]) => a + v, 0))