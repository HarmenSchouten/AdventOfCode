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

const maxSeatId = text
    .split("\r\n")
    .map(item => getSeat(item))
    .map(item => item.row * 8 + item.column)
    .sort((a, b) => b - a)
    .shift()

console.log("Part 1", maxSeatId)