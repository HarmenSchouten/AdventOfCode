const text = await Deno.readTextFile("./Day09/input.txt")

const numbers = text.split("\r\n").map(Number)

const findIndices = (array:number[], value: number) => 
    array.reduce((acc, state, idx) => {
        if (acc.length > 0) return acc
        
        const index = array.reduce((acc, item, sIdx) => {
            if (acc.index !== undefined) return acc
            if (sIdx <= idx) return acc
            if (acc.value + item < value) return {...acc, value: acc.value + item, numbers: [...acc.numbers, item]}
            if (acc.value + item === value)  return {index: sIdx, value: acc.value + item, numbers: [...acc.numbers, item]}
            if (acc.value + item > value) return {index: undefined, value, numbers: []}
            return acc
        }, {index: undefined, value: state, numbers: [state] } as {index : number | undefined, value: number, numbers: number[]})
        
        return index.index && index.index !== 0
            ? index.numbers
            : acc
    }, [] as number[])

const range = findIndices(numbers, 50047984).sort((a, b) => a - b)
console.log("Part 1", range.shift()! + range.pop()!)