const text = await Deno.readTextFile("./Day10/input.txt")

const numbers = text
    .split("\r\n")
    .map(Number)
    .sort((a, b) => a - b)

numbers.push(numbers[numbers.length - 1] + 3)
const answer = numbers
    .reduce((acc, state) => {
        if (state - acc.prevValue === 1) return {...acc, diff1: acc.diff1 + 1, prevValue: state}
        if (state - acc.prevValue === 3) return {...acc, diff3: acc.diff3 + 1, prevValue: state}
        return {...acc, prevValue: state}
    }, {diff1: 0, diff3: 0, prevValue: 0})

console.log("Part 1", answer.diff1 * answer.diff3)