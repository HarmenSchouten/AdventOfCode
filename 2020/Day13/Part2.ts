const text = await Deno.readTextFile("./Day13/input.txt")
const lines = text.split("\r\n")

const busIds = lines[1]
    .split(",")
    .map((item, idx) => ({
        id: item,
        offset: idx
    }))
    .filter(item => item.id !== 'x')

let minTime = 0;
let product = 1

busIds.forEach(bus => {
    const id = parseInt(bus.id, 10)
    const offset = bus.offset

    while ((minTime + offset) % id !== 0) {
        minTime += product
    }
    product *= id

})

console.log(minTime)