import "../utils/index.ts"
const input = await Deno.readTextFile("./day05/input.txt")

const answer = input
    .splitLb()
    .reduce((acc, state) => {
        const letters = Array.from(state)
        const rule1 = letters
            .map((item, idx, arr) => ({str: `${item}${arr[idx + 1]}`, idx: idx}))
            .some((v, _, arr) => arr.find(i => i.str === v.str && i.idx - v.idx > 1))

        const rule2 = letters.some((item, idx, arr) => item === arr[idx + 2])

        if (rule1 && rule2) acc += 1
        return acc
    }, 0)

console.log(answer)