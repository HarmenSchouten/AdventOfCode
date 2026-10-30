import "../../utils/index.ts"

const input = await Deno.readTextFile(new URL("./input.txt", import.meta.url))

const isValidTriangle = (sides: number[]) => {
    const [a, b, c] = sides.toSorted((x, y) => x - y)
    return a + b > c
}
const answer = input.ints().chunk(3).filter(isValidTriangle).length
console.log(answer)