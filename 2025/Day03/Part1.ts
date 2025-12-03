import "../utils/index.ts"
const input = await Deno.readTextFile("Day03/input.txt");

const answer = input
    .splitLb()
    .map(x => x.match(/\d/g)?.map(Number) ?? [])
    .reduce((acc, state) => {
        let best = Number.MIN_SAFE_INTEGER;
        for (let i = 0; i < state.length; i++)
        {
            const left = state[i]
            for (let j = i + 1; j < state.length; j++)
            {
                const right = state[j]
                if (best < (left * 10 + right)) best = (left * 10 + right)
            }
        }
        return acc += best
    }, 0)

console.log(answer)