import "../utils/index.ts"
const input = await Deno.readTextFile("Day09/input.txt");

const parsed = input.splitLb()
    .map(l => {
        const [x, y] = l.ints()
        return { x, y }
    })

console.log(parsed);

let answer = 0;
for (let i = 0; i < parsed.length; i++) {
    for (let j = i + 1; j < parsed.length; j++) {
        const distX = Math.abs(parsed[i].x - parsed[j].x) + 1
        const distY = Math.abs(parsed[i].y - parsed[j].y) + 1

        // console.log(parsed[i], parsed[j], distX, distY, distX * distY)
        
        answer = Math.max(answer, distX * distY)
    }
}

console.log(answer)