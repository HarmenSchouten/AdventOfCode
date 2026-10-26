import "../utils/index.ts"
const input = await Deno.readTextFile("Day05/input.txt");

const [rangesStr, _] = input.splitDlb();

const ranges = rangesStr
    .splitLb()
    .map(x => {
        const [from, to] = x.split('-').map(Number)
        return { from, to }
    })
    .sort((a, b) => a.from - b.from);


let current = 0;
let answer = 0
// Iterate through the sorted ranges (by start value).
// Jump to start of next range if necessary, add values to the end of the range.
for (const range of ranges) {
    current = Math.max(current, range.from);

    if (current > range.to) continue;

    answer += range.to - current + 1;
    current = range.to + 1;
}

console.log(answer)
