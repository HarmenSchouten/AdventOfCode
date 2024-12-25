import "../utils/index.ts"
const input = await Deno.readTextFile("./day02/input.txt")

const answer = input
    .splitLb()
    .map(item => item.split("x").map(Number))
    .reduce((acc, state) => {
        const a1 = state[0] * state[1]
        const a2 = state[1] * state[2]
        const a3 = state[2] * state[0]
        return acc + (2 * a1 + 2 * a2 + 2 * a3) + Math.min(a1, a2, a3)
    }, 0)

console.log(answer)