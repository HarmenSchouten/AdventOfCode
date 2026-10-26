import "../utils/index.ts"
const input = await Deno.readTextFile("./day17/input.txt")

const numbers = input
    .split("\n")
    .map(line => parseInt(line, 10))

const cache = new Map<string, number>();

const explore = (index: number, remaining: number): number => {
    if (remaining === 0) return 1;
    if (remaining < 0 || index < 0) return 0;

    const key = `${index}-${remaining}`;
    if (cache.has(key)) return cache.get(key)!;

    const total =
        explore(index - 1, remaining) +
        explore(index - 1, remaining - numbers[index]);

    cache.set(key, total);
    return total;
};

console.log(explore(numbers.length - 1, 150))