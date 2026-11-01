import "../../utils/index.ts"
import * as crypto from 'node:crypto'
const input = await Deno.readTextFile(new URL("./input.txt", import.meta.url))

const code = Array.from({ length: 8 }).map(_ => undefined) as (string | undefined)[]
let i = 0;
while (code.some(x => x === undefined)) {
    const result = crypto.createHash('md5').update(`${input}${i}`).digest('hex')
    if (result.startsWith('00000')) {
        const position = parseInt(result.slice(5, 6))
        if (!isNaN(position) && position < code.length && !code[position]) {
            code[position] = result.slice(6, 7)
        }
    }
    i++
}

console.log(code.join(''))