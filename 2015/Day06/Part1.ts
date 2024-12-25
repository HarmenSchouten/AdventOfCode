import "../utils/index.ts"
const input = await Deno.readTextFile("./day06/input.txt")

const lights = new Set<string>()

input
    .splitLb()
    .map(line => line.match(/(on)|(off)|(toggle)|(\d+)/g)!)
    .forEach(line => {
        const [op, ...rest] = line
        const [x1, y1, x2, y2] = rest.map(Number)
        for (let x = x1; x <= x2; x++)
        for (let y = y1; y <= y2; y++) {
            const key = `${x}.${y}`
            if (op === "off") lights.delete(key)
            if (op === "on") lights.add(key)
            if (op === "toggle") {
                if (lights.has(key)) lights.delete(key)
                else lights.add(key)
            }
        }
    })

console.log(lights.size)