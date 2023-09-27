const text = await Deno.readTextFile("./Day14/input.txt")

const lines = text.split("\r\n")

let mask = ""
const memMap = new Map<number, number>()

lines.forEach(line => {
    if (line.startsWith("mask")) {
        mask = line.split(" = ")[1]
        return
    }

    const [memString, val] = line.split(" = ")
    const memVal = Number(memString.match(/\d+/))
    const valString = [...(Number(val) >>> 0).toString(2).padStart(mask.length, "0")];

    ([...mask]).forEach((char, idx) => {
        if (char !== "X") {
            valString[idx] = char
        }
    })

    memMap.set(memVal, parseInt(valString.join(""), 2))
})

console.log("Part 1", [...memMap.values()].filter(item => item !== 0).reduce((acc, state) => state += acc, 0))
