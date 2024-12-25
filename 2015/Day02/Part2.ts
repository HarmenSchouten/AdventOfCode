import "../utils/index.ts"
const input = await Deno.readTextFile("./day02/input.txt")
const answer = input
    .splitLb()
    .map(item => item.split("x").map(Number))
    .reduce((acc, state) => {
        const bow = state.product()
        const ribbon = 2 * Math.min(state[0] + state[1], state[1] + state[2], state[0] + state[2])
        return acc + bow + ribbon 
    }, 0)

console.log(answer)