import "../utils/index.ts"
const input = await Deno.readTextFile("./day12/input.txt")

const answer = input
    .match(/(-)*\d+/g)!
    .reduce((acc, state) => acc += Number(state), 0)

console.log(answer)