const text = await Deno.readTextFile("./Day06/input.txt")

const sumCount = text
    .split("\r\n\r\n")
    .map(item => item.includes("\r\n")
        ? item.split("\r\n").flatMap(item => [...item])
        : [...item])
    .map(item => item.filter((val, index, arr) => arr.indexOf(val) === index))
    .reduce((state, curr) => state += curr.length, 0)

console.log("Part 1", sumCount)