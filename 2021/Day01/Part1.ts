const text = await Deno.readTextFile(new URL("./input.txt", import.meta.url))

const items = text.split("\r\n")

console.log(items)

let increases = 0;

items.reduce((acc, state) => {
    if (Number(state) > Number(acc)) {
        increases++
    }

    return state
})

console.log(increases)