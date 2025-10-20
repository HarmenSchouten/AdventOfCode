import "../utils/index.ts"
const input = await Deno.readTextFile("./day17/input.txt")

const numbers = input
    .split("\n")
    .map(line => parseInt(line, 10))

const results = [] as number[]

const explore = (index: number, remaining: number, usedCount: number) => {
    if (remaining === 0) {
        results.push(usedCount)
        return
    }
    if (remaining < 0 || index < 0) return 0;

    explore(index - 1, remaining, usedCount)
    explore(index - 1, remaining - numbers[index], usedCount + 1);
};

explore(numbers.length - 1, 150, 0)
const minUsed = Math.min(...results)
console.log(results.filter(r => r === minUsed).length)