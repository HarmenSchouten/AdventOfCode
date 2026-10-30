import "../../utils/index.ts"

const input = await Deno.readTextFile(new URL("./input.txt", import.meta.url))

const board = ["123", "456", "789"]
const moves: Record<string, number[]> = { U: [0, -1], D: [0, 1], L: [-1, 0], R: [1, 0] }
let x = 1, y = 1
const code = [] as string[]
input
    .splitLb()
    .map(line => {
        for (const char of line) {
            const [dx, dy] = moves[char]
            if (board[y + dy]?.[x + dx]?.trim()) x += dx, y += dy
        }
        code.push(board[y][x])
    })
    
console.log(code.join(''))
