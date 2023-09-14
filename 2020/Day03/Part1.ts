const text = await Deno.readTextFile("./Day03/input.txt")

const treePositions = text
    .split("\r\n")
    .flatMap((row, y) => 
        [...row].map((item, x) => {
            if (item === "#") {
                return {x, y}
            }
        }))
    .filter(item => item !== undefined)

const lines = text.split("\r\n")
const lineLength = lines[0].length

let x = 0;
let y = 0;
let treesEncountered = 0
while (y < lines.length) {
    x += 3
    y += 1

    if (x >= lineLength) {
        x -= lineLength
    }

    if (treePositions.find(item => item!.x === x && item!.y === y)) {
        treesEncountered++;
    }
}

console.log("Part 1: ", treesEncountered)