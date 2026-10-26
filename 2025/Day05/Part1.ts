import "../utils/index.ts"
const input = await Deno.readTextFile("Day05/input.txt");

const [rangesStr, ingredientsStr] = input.splitDlb();

const ranges = rangesStr
    .splitLb()
    .map(x => {
        const [from, to] = x.split('-').map(Number)
        return { from, to }
    })

const answer = ingredientsStr
    .splitLb()
    .map(x => Number(x))
    .reduce((acc, state) => {
        if (ranges.some(x => x.from <= state && x.to >= state)) acc += 1
        return acc
    }, 0)

console.log(answer)