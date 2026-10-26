const text = await Deno.readTextFile(new URL("./input.txt", import.meta.url))
const treshold = 2020
const result = text
    .split("\r\n")
    .map(Number)
    .reduce((acc, curr, idx, arr) => {
        const found = arr.find((x, arrIdx) => arrIdx !== idx && x + curr === treshold)
        return found
            ? curr * found
            : acc
    }, 0)

console.log("Part1: ", result)