const text = await Deno.readTextFile(new URL("./input.txt", import.meta.url))
const items = text.split("\r\n")