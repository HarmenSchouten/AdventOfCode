import { Grid2D } from "../utils/grid2d.ts";
import "../utils/index.ts"
const input = await Deno.readTextFile("Day04/input.txt");

const grid = new Grid2D<string>(input, v => v)

let answer = 0
while (true) {
    const check = answer;
    grid
        .filter(x =>
            x.value === '@'
            && x.getAllNeighbours()
                .map(x => x?.value)
                .filter(x => x === '@').length < 4)
        .forEach(x => {
            grid.set(x.x, x.y, 'x')
            answer++
        })

    if (check === answer) break;
}

console.log(answer)