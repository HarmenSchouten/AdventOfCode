const text = await Deno.readTextFile("./Day06/input.txt")

const sumCount = text
    .split("\r\n\r\n")
    .map(item => item.includes("\r\n")
        ? item.split("\r\n").map(item => [...item])
        : [...item])
    .map(group => ({
        groups: group,
        uniques: group
            .flatMap(item => [...item])
            .filter((val, index, arr) => arr.indexOf(val) === index)
    }))
    .reduce((state, acc) => {
        if (acc.groups.some(item => Array.isArray(item))) {
            const groups = acc.groups as string[][]
            return state + acc.uniques.filter(unique => groups.every(item => item.includes(unique))).length
        } 
        return state + acc.groups.length
    }, 0)

console.log("Part 2", sumCount)