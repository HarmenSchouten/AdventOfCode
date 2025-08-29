import "../utils/index.ts"
const input = await Deno.readTextFile("./day12/input.txt")

const items = [] as number[]
const sumNumbers = (obj: unknown) => {
    if (typeof (obj) === 'object') {
        if (Array.isArray(obj)) {
            obj.reduce((acc, item) => acc + sumNumbers(item), 0)
        } else {
            if (!Object.values(obj as object).includes("red")) {
                Object.values(obj as object).reduce((acc, item) => acc + sumNumbers(item), 0)
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