import "../../utils/index.ts"
const input = await Deno.readTextFile(new URL("./input.txt", import.meta.url))

const current = [0, 0]
const visited = new Set<string>()

Array
    .from(input)
    .forEach(item => {
        visited.add(`${current[0]}.${current[1]}`)
        if (item === '>') current[0] += 1
        if (item === '<') current[0] -= 1
        if (item === '^') current[1] += 1
        if (item === 'v') current[1] -= 1
    })

console.log(visited.size)