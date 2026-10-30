import "../../utils/index.ts"

const input = await Deno.readTextFile(new URL("./input.txt", import.meta.url))

const isValidTriangle = (sides: number[]) => {
    const [a, b, c] = sides.toSorted((x, y) => x - y)
    return a + b > c
}

const answer = input.ints().chunk(9)
    .flatMap(c => [0, 1, 2].map(j => [c[j], c[j + 3], c[j + 6]]))
    .filter(isValidTriangle)
    .length

console.log(answer)