import "../../utils/index.ts"
const input = await Deno.readTextFile(new URL("./input.txt", import.meta.url));

console.log(input.match(/\(/g)!.length - input.match(/\)/g)!.length)