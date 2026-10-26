import "../utils/index.ts"
const input = await Deno.readTextFile("Day03/input.txt");

const answer = input
    .splitLb()
    .map(x => x.match(/\d/g)?.map(Number) ?? [])
    .reduce((acc, state) => {
        let best = Number.MIN_SAFE_INTEGER;
        for (let i = 0; i < state.length; i++) {
            const first = state[i]
            for (let j = i + 1; j < state.length; j++) {
                const second = state[j]
                const val = first * 10 + second
                if (best < val) best = val
            }
        }
        return acc += best
    }, 0)

console.log(answer)