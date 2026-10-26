import "../../utils/index.ts"
const input = await Deno.readTextFile(new URL("./input.txt", import.meta.url))

const answer = input
    .match(/(-)*\d+/g)!
    .reduce((acc, state) => acc += Number(state), 0)

console.log(answer)