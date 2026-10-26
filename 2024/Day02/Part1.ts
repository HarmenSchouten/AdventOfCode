const input = await Deno.readTextFile(new URL("./input.txt", import.meta.url));

const isLineSafe = (items: number[]) => {
    return items.every((item, idx, arr) => {
        if (idx === 0) return true;
        const diff = item - arr[idx - 1]
        return diff < 0 && Math.abs(diff) <= 3
    }) || items.every((item, idx, arr) => {
        if (idx === 0) return true;
        const diff = item - arr[idx - 1]
        return diff > 0 && Math.abs(diff) <= 3
    })
}

const answer = input
    .split("\r\n")
    .map(line => line.split(" ").map(Number))
    .reduce((acc, state) => isLineSafe(state) ? acc += 1 : acc, 0)   

console.log(answer)