import "../../utils/index.ts"
const input = await Deno.readTextFile(new URL("./input.txt", import.meta.url))

const answer = input
    .splitLb()
    .reduce((acc, state) => {
        const total = state.length;
        const actual = state.match(/(\\\\)|(\\x([a-f]|[0-9]){2})|(\\")|([a-z])/g)!
        return acc + (total - actual.length)
    }, 0)

console.log(answer)