const text = await Deno.readTextFile("./Day05/input.txt")

const getUpperBound = (min: number, max: number) =>
    min + Math.ceil((max - min) / 2)

const getLowerBound = (min: number, max: number) =>
    min + Math.floor((max - min) / 2)

const getSeat = (input: string) => {
    const range = { rowMin: 0, rowMax: 127, colMin: 0, colMax: 7 }
    for (let i = 0; i < input.length; i++) {
        const letter = input[i]
        if (letter === "F") range.rowMax = getLowerBound(range.rowMin, range.rowMax)
        if (letter === "B") range.rowMin = getUpperBound(range.rowMin, range.rowMax)
        if (letter === "R") range.colMin = getUpperBound(range.colMin, range.colMax)
        if (letter === "L") range.colMax = getLowerBound(range.colMin, range.colMax)
    }
    return { row: range.rowMax, column: range.colMax }
}

const missingSeatId = text
    .split("\r\n")
    .map(item => getSeat(item))
    .map(item => item.row * 8 + item.column)
    .sort((a, b) => a - b)
    .filter((item, index, array) => 
        index !== 0
        && index !== array.length - 1
        && (array.find(x => x === (item + 1)) === undefined 
            || array.find(x => x === item - 1) === undefined))

console.log("Part 2", missingSeatId[0] + 1)