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

const configs = [
    { xIncrease: 1, yIncrease: 1},
    { xIncrease: 3, yIncrease: 1},
    { xIncrease: 5, yIncrease: 1},
    { xIncrease: 7, yIncrease: 1},
    { xIncrease: 1, yIncrease: 2},
]

const walkGrid = (xIncrease: number, yIncrease: number) => {
    let x = 0;
    let y = 0;
    let treesEncountered = 0
    while (y < lines.length) {
        x += xIncrease
        y += yIncrease
    
        if (x >= lineLength) {
            x -= lineLength
        }
    
        if (treePositions.find(item => item!.x === x && item!.y === y)) {
            treesEncountered++;
        }
    }

    return treesEncountered
}

const answer = configs
    .reduce((state, curr) => {
        const treeNumber = walkGrid(curr.xIncrease, curr.yIncrease)
        if (state === 0) {
            return treeNumber
        }
        return state * treeNumber
    }, 0)


console.log("Part 1: ", answer)