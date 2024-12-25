import "../utils/index.ts"
const input = await Deno.readTextFile("./day05/input.txt")

const vowels = [..."aeiou"]
const blacklist = ["ab", "cd", "pq", "xy"]

const answer = input
    .splitLb()
    .reduce((acc, state) => {
        const letters = Array.from(state)
        const rule1 = letters.filter(v => vowels.includes(v)).length >= 3
        const rule2 = letters.some((item, idx, arr) => item === arr[idx + 1])
        const rule3 = blacklist.every(item => !state.includes(item))

        if (rule1 && rule2 && rule3) acc += 1
        return acc
    }, 0)

console.log(answer)