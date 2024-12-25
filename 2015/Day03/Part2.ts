import "../utils/index.ts"
const input = await Deno.readTextFile("./day03/input.txt")

const current = [0, 0, 0, 0]
const visited = new Set<string>()

Array
    .from(input)
    .forEach((item, idx) => {
        const idxX = idx % 2 === 0 ? 0 : 2
        const idxY = idx % 2 === 0 ? 1 : 3
        if (item === '>') current[idxX] += 1
        if (item === '<') current[idxX] -= 1
        if (item === '^') current[idxY] += 1
        if (item === 'v') current[idxY] -= 1
        visited.add(`${current[idxX]}.${current[idxY]}`)
    })

console.log(visited.size)