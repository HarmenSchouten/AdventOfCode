import "../../utils/index.ts"
const input = await Deno.readTextFile(new URL("./input.txt", import.meta.url))

const packages = input.ints().sort((a, b) => a - b)
const total = packages.sum()
const targetWeight = total / 4

let indices = [0]

const rollOver = () => {
    const max = (i: number) => packages.length - indices.length + i
    const wheel = indices.findLastIndex((x, i) => x < max(i))

    if (wheel === -1) {
        indices = Array.from({ length: indices.length + 1 }).map((_, i) => i)
        return true;
    }

    const start = indices[wheel] + 1
    indices = indices.map((x, i) => i < wheel ? x : start + i - wheel)
    return false;
}

const combinations = []

while (true)
{
    const weight = indices.map(x => packages[x]).sum();
    if (weight === targetWeight) combinations.push(indices)
    const changedGroups = rollOver()
    if (changedGroups && combinations.length > 0) break;
}

const answer = combinations
    .map(c => c.map(x => packages[x]).product())
    .sort((a, b) => a - b)
    .at(0)

console.log(answer)