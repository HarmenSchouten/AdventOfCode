import "../utils/index.ts"
const input = await Deno.readTextFile("Day02/input.txt");

// Grab set of characters in capture group 1
// Match result of group 1 
// Require 1 or more
const regex = new RegExp("([0-9].*)\\1{1,}")

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
            const matches = regex.test(numberString)
            if (matches) acc += i
        }
        return acc;
    }, 0)

console.log(answer)



