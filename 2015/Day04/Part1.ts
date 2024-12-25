import "../utils/index.ts"
import * as crypto from 'node:crypto'
const input = await Deno.readTextFile("./day04/input.txt")

let i = 0;
while (true) {
    const result = crypto.createHash('md5').update(`${input}${i}`).digest('hex')
    if (result.startsWith('00000')) {
        console.log(i)
        break;
    }
    i++
}