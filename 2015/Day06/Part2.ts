import "../utils/index.ts"
const input = await Deno.readTextFile("./day06/input.txt")

const lights = new Map<string, number>()

const getOrInitLight = (key: string) => {
    if (!lights.has(key)) lights.set(key, 0)
    return lights.get(key)!
}

input
    .splitLb()
    .map(line => line.match(/(on)|(off)|(toggle)|(\d+)/g)!)
    .forEach(line => {
        const [op, ...rest] = line
        const [x1, y1, x2, y2] = rest.map(Number)
        for (let x = x1; x <= x2; x++)
        for (let y = y1; y <= y2; y++) {
            const key = `${x}.${y}`
            if (op === "off") lights.set(key, Math.max(getOrInitLight(key) - 1, 0))
            if (op === "on") lights.set(key, getOrInitLight(key) + 1)
            if (op === "toggle") lights.set(key, getOrInitLight(key) + 2)
        }
    })

console.log(lights.entries().reduce((acc, [_k, v]) => acc + v, 0))