import "../utils/index.ts"
const input = await Deno.readTextFile("./Day01/input.txt");

let floor = 0

for (let i = 0; i < input.length; i++) {
    if (input[i] === "(") floor++
    else floor--

    if (floor === -1) {
        console.log(i + 1)
        break
    }
}