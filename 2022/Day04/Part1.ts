const text = await Deno.readTextFile(new URL("./input.txt", import.meta.url))
const items = text.split("\r\n")

console.log(items.reduce((acc, item) => {
    const split = item.split(",")
    const rangeA = [Number(split[0].split("-")[0]), Number(split[0].split("-")[1])]
    const rangeB = [Number(split[1].split("-")[0]), Number(split[1].split("-")[1])]
    
    if (rangeA[0] >= rangeB[0] && rangeA[1] <= rangeB[1] || 
        rangeB[0] >= rangeA[0] && rangeB[1] <= rangeA[1]){
        return acc += 1
    }
    return acc
}, 0))
