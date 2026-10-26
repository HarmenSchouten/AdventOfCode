import "../utils/index.ts"
const input = await Deno.readTextFile("./day10/input.txt")

const parseToMap = (input:string) => {
    let current = ''
    const values = [] as {key: string, count: number}[]
    for (let i = 0; i <= input.length; i++) {
        if (i === input.length) {
            values.push({key: current[0], count: current.length})
            break;
        }
        if (!current || current.endsWith(input[i])) current += input[i]
        else {
            values.push({key: current[0], count: current.length})
            current = input[i]
        }
    }

    return values;
}

let str = input;

for (let i = 0; i < 50; i++) {
    str = parseToMap(str).reduce((acc, v) => acc += `${v.count}${v.key}`, '')
}

console.log(str.length)