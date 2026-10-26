const text = await Deno.readTextFile("./Day09/input.txt")

const numbers = text.split("\r\n").map(Number)

const findIndices = (array:number[], value: number) => 
    array.reduce((acc, state, idx) => {
        if (acc.first && acc.second) return acc
        const index = array.findIndex((item, id) => item + state === value && id !== idx)
        return index !== -1
            ? {first: idx, second: index}
            : acc
    }, {first: undefined, second: undefined} as {first: number | undefined, second: number | undefined})

const searchArray = numbers.slice(0, 25)
let index = 25;
while (index < numbers.length) {
    const {first, second} = findIndices(searchArray, numbers[index])
    if (first !== undefined && second !== undefined) {
        searchArray.splice(0, 1, numbers[index])
        index++
    } else {
        break;
    }
}

console.log("Part 1", numbers[index])