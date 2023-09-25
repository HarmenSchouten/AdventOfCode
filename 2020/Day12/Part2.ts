const text = await Deno.readTextFile("./Day12/input.txt")

let shipX = 0, shipY = 0, waypointX = 10, waypointY = -1

const handleWaypointMove = (direction: string, value: number) => {
    switch(direction) {
        case "E": return waypointX += value;
        case "N": return waypointY -= value;
        case "S": return waypointY += value;
        case "W": return waypointX -= value;
    }
}

const rotatePoint = (degrees: number) => {
    const newX = (waypointX - shipX) * Math.cos(degrees * Math.PI / 180) - (waypointY - shipY) * Math.sin(degrees * Math.PI / 180) + shipX;
    const newY = (waypointX - shipX) * Math.sin(degrees * Math.PI / 180) + (waypointY - shipY) * Math.cos(degrees * Math.PI / 180) + shipY;
    waypointX = newX, waypointY = newY
}

text
    .split("\r\n")
    .map(item => ({action: item[0], value: Number(item.slice(1))}))
    .forEach(i => {
        switch(i.action) {
            case "R": return rotatePoint(i.value)
            case "L": return rotatePoint(-i.value)
            case "F": 
                {
                    const diffX = waypointX - shipX, diffY = waypointY - shipY
                    shipX += i.value * diffX
                    shipY += i.value * diffY
                    waypointX = shipX + diffX
                    waypointY = shipY + diffY
                    break;
                }
            default: return handleWaypointMove(i. action, i.value)
        }
    })

const manhattan = (x1: number, y1: number, x2: number, y2: number) =>
    Math.abs(x2 - x1) + Math.abs(y2 - y1)

console.log("Part 2", manhattan(0, 0, shipX, shipY))