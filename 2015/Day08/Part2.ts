import "../../utils/index.ts"
const input = await Deno.readTextFile(new URL("./input.txt", import.meta.url))

const answer = input
    .splitLb()
    .reduce((acc, state) => acc + (state.replaceAll("\"", "##").replaceAll("\\", "##").length + 2 - state.length), 0)

console.log(answer)