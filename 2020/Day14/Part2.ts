const text = await Deno.readTextFile("./Day14/input.txt")

const lines = text.split("\r\n")

let mask = ""
const memMap = new Map<string, number>()

const getCombinations = (input: string) => {
    const combinations = [] as string[]
    const queue = [input] as string[]

    while (queue.length > 0) {
        const current = queue.shift()!

        const index = current?.indexOf("X")
        if (index == -1) {
            combinations.push(current)
        } else {
            const zeroReplacement = current.slice(0, index) + '0' + current.slice(index + 1)
            const oneReplacement = current.slice(0, index) + '1' + current.slice(index + 1)

            queue.push(zeroReplacement, oneReplacement)
        }
    }
    return combinations
}

lines.forEach(line => {
    if (line.startsWith("mask")) {
        mask = line.split(" = ")[1]
    } else {
        const [memString, val] = line.split(" = ")
        const memVal = Number(memString.match(/\d+/))
        let memBinary = (memVal >>> 0).toString(2).padStart(mask.length, "0");

        [...mask].forEach((char, idx) => {
            if (char === "1") memBinary = memBinary.slice(0, idx) + "1" + memBinary.slice(idx + 1)
            if (char === "X") memBinary = memBinary.slice(0, idx) + "X" + memBinary.slice(idx + 1)
        })
        
        getCombinations(memBinary)
            .forEach(item => {
                memMap.set(item, Number(val))
            })
    }
})

console.log("Part 2", [...memMap.values()].filter(item => item !== 0).reduce((acc, state) => state += acc, 0))