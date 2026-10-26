import "../../utils/index.ts"

const text = await Deno.readTextFile(new URL("./input.txt", import.meta.url))

const steps = text.split(",")
const answer = steps
    .map(step => {
        return [...step].reduce((acc, char) => {
            const code = char.charCodeAt(0)
            acc += code;
            acc *= 17
            acc %= 256
            return acc;
        }, 0)
    })
    .sum()

console.log(answer)