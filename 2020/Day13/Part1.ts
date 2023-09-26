const text = await Deno.readTextFile("./Day13/input.txt")
const lines = text.split("\r\n")
const earliestDeparture = Number(lines[0])

const busId = lines[1]
    .split(",")
    .filter(item => item !== "x")
    .map(Number)
    .map(id => ({id: id, count: (Math.ceil(earliestDeparture / id) * id) - earliestDeparture}))
    .sort((a, b) => a.count - b.count)
    .shift()

console.log("Part 1", busId!.id * busId!.count)