import "../../utils/index.ts"
import * as crypto from 'node:crypto'
const input = await Deno.readTextFile(new URL("./input.txt", import.meta.url))

let code = ''
let i = 0;
while (code.length < 8) {
    const result = crypto.createHash('md5').update(`${input}${i}`).digest('hex')
    if (result.startsWith('00000')) code = code + result.slice(5, 6)
    i++
}

console.log(code)