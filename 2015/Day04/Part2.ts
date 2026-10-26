import "../../utils/index.ts"
import * as crypto from 'node:crypto'
const input = await Deno.readTextFile(new URL("./input.txt", import.meta.url))

let i = 0;
while (true) {
    const result = crypto.createHash('md5').update(`${input}${i}`).digest('hex')
    if (result.startsWith('000000')) {
        console.log(i)
        break;
    }
    i++
}