import "../utils/index.ts"
const input = await Deno.readTextFile("./day12/input.txt")

const items = [] as number[]
const sumNumbers = (obj: unknown) => {
    if (typeof (obj) === 'object') {
        if (Array.isArray(obj)) {
            obj.forEach((item) => sumNumbers(item))
        } else {
            if (!Object.values(obj as object).includes("red")) {
                Object.values(obj as object).forEach((item) => sumNumbers(item))
            }
        }
    } else {
        if (!isNaN(Number(obj))) {
            items.push(Number(obj))
        }
    }
}

sumNumbers(JSON.parse(input))

const answer = items.reduce((acc, state) => acc += Number(state), 0)

console.log(answer)