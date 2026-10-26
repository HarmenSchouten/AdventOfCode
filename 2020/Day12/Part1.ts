const text = await Deno.readTextFile("./Day12/input.txt")

let currentDirection = "E"
const directionMap = {"N": 0, "E": 90, "S": 180, "W": 270}
let x = 0, y = 0

const handleMove = (direction: string, value: number) => {
    switch(direction) {
        case "E": return x += value;
        case "N": return y -= value;
        case "S": return y += value;
        case "W": return x -= value;
    }
}

text
    .split("\r\n")
    .map(item => ({action: item[0], value: Number(item.slice(1))}))
    .forEach(i => {
        switch(i.action) {
            case "R": 
                {
                    const currentDegrees = directionMap[currentDirection as keyof typeof directionMap]
                    const wantedValue = currentDegrees + i.value
                    const reducedValue = wantedValue >= 360 ? wantedValue - 360 : wantedValue
                    currentDirection = Object.keys(directionMap).find(item => directionMap[item as keyof typeof directionMap] === reducedValue)!
                    break;
                }
            case "L": 
                {
                    const currentDegrees = directionMap[currentDirection as keyof typeof directionMap]
                    const wantedValue = currentDegrees - i.value
                    const reducedValue = wantedValue < 0 ? wantedValue + 360 : wantedValue
                    currentDirection = Object.keys(directionMap).find(item => directionMap[item as keyof typeof directionMap] === reducedValue)!
                    break;
                }
            case "F": return handleMove(currentDirection, i.value)
            default: return handleMove(i. action, i.value)
        }
    })

const manhattan = (x1: number, y1: number, x2: number, y2: number) =>
    Math.abs(x2 - x1) + Math.abs(y2 - y1)

console.log("Part 1", manhattan(0, 0, x, y))