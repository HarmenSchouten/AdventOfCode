import "../utils/index.ts"
const input = await Deno.readTextFile("./Day01/input.txt");

console.log(input.match(/\(/g)!.length - input.match(/\)/g)!.length)