import "../utils/index.ts"
const input = await Deno.readTextFile("Day02/input.txt");

const answer = input
    .split(',')
    .map(x => {
        const [start, end] = x.split('-')
        return { start: Number(start), end: Number(end) }
    })
    .reduce((acc, state) => {
        for (let i = state.start; i < state.end; i++)
        {
            const numberString = String(i)
            if (numberString.length % 2 === 1) continue;

            const splitMarker = numberString.length / 2
            const [left, right] = [numberString.substring(0, splitMarker), numberString.substring(splitMarker)]

            if (left === right) acc += i
        }
        return acc;
    }, 0)

console.log(answer)