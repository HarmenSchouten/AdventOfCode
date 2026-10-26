import { Grid2D } from "../../utils/grid2d.ts";
import "../../utils/index.ts"
const input = await Deno.readTextFile(new URL("./input.txt", import.meta.url));

const grid = new Grid2D<string>(input, v => v)

const answer = grid
    .filter(x => 
        x.value === '@' 
        && x.getAllNeighbours()
            .map(x => x?.value)
            .filter(x => x === '@').length < 4)
    .length

console.log(answer)