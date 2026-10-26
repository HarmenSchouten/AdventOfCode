const input = await Deno.readTextFile(new URL("./input.txt", import.meta.url))

let x = 0, y = 0, dx = 0, dy = 1

for (const [, turn, n] of input.matchAll(/([LR])(\d+)/g)) {
    [dx, dy] = turn === "R" ? [dy, -dx] : [-dy, dx]
    for (let i = 0; i < +n; i++) {
        x += dx, y += dy
    }
}

console.log(Math.abs(x) + Math.abs(y))