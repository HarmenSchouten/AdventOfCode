import "../utils/index.ts"
const input = await Deno.readTextFile("Day09/input.txt");

const points = input
    .splitLb()
    .map(x => x.ints())

const clampCoordinates = (coords: number[]) => {
    let coordMax = 1
    const sortedCoords = [...coords].sort((a, b) => a - b)
    const coordsMapping = new Map<number, number>()
    
    for (const coord of sortedCoords) {
        if (!coordsMapping.has(coord)) {
            coordsMapping.set(coord, coordMax)
            coordMax += 2
        }
    }
    
    return [coordsMapping, coordMax - 1] as const
}

const [xCoordsMapping, maxX] = clampCoordinates(points.map(x => x[0]))
const [yCoordsMapping, maxY] = clampCoordinates(points.map(x => x[1]))

const grid = new Array(maxY + 1).fill(0).map(_ => new Array(maxX + 1).fill(0))

const drawLine = (x1: number, y1: number, x2: number, y2: number) => {
    let currX = x1
    let currY = y1
    
    if (currX === x2) {
        currY += currY > y2 ? -1 : 1
    } else {
        currX += currX > x2 ? -1 : 1
    }
    
    while (currY !== y2 || currX !== x2) {
        grid[currY][currX] = 1
        if (currX === x2) {
            currY += currY > y2 ? -1 : 1
        } else {
            currX += currX > x2 ? -1 : 1
        }
    }
}

const flood = (startI: number, startJ: number) => {
    const queue = [startI * grid[0].length + startJ]
    grid[startI][startJ] = -1
    
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]
    
    while (queue.length) {
        const pos = queue.pop()!
        const i = Math.floor(pos / grid[0].length)
        const j = pos % grid[0].length
        
        for (const [di, dj] of directions) {
            const newI = i + di
            const newJ = j + dj
            
            if (newI < 0 || newJ < 0 || newI >= grid.length || newJ >= grid[0].length) continue
            if (grid[newI][newJ]) continue
            
            grid[newI][newJ] = -1
            queue.push(newI * grid[0].length + newJ)
        }
    }
}

const isValid = (point1: number[], point2: number[]) => {
    const x1 = xCoordsMapping.get(point1[0])!
    const y1 = yCoordsMapping.get(point1[1])!
    const x2 = xCoordsMapping.get(point2[0])!
    const y2 = yCoordsMapping.get(point2[1])!
    
    const left = Math.min(x1, x2)
    const right = Math.max(x1, x2)
    const top = Math.max(y1, y2)
    const bottom = Math.min(y1, y2)
    
    for (let y = bottom; y <= top; y += 2) {
        for (let x = left; x <= right; x += 2) {
            if (grid[y][x] === -1) return false
        }
    }
    
    return true
}

let prevX: number | null = null
let prevY: number | null = null

for (const point of points) {
    const x = xCoordsMapping.get(point[0])!
    const y = yCoordsMapping.get(point[1])!
    grid[y][x] = 1
    
    if (prevX !== null && prevY !== null) {
        drawLine(prevX, prevY, x, y)
    }
    
    prevX = x
    prevY = y
}

drawLine(prevX!, prevY!, xCoordsMapping.get(points[0][0])!, yCoordsMapping.get(points[0][1])!)

flood(0, 0)

const answer = points.reduce((best, _, i) => {
    return points.slice(0, i).reduce((acc, _, j) => {
        const area = (1 + Math.abs(points[i][0] - points[j][0])) 
            * (1 + Math.abs(points[i][1] - points[j][1]))
        
        if (area > acc && isValid(points[i], points[j])) {
            return area
        }
        
        return acc
    }, best)
}, 0)

console.log(answer)