const text = await Deno.readTextFile("./Day17/input.txt")

type GridType = {x: number, y:number, z:number, w:number, state: string}
const grid = [] as GridType[]

text.split("\r\n").forEach((line, y) => {
    line.split("").forEach((char, x) => grid.push({x: x, y: y, z: 0, w:0, state: char}))
})

const getOrInitNeighbours = (x: number, y: number, z:number, w: number) => {
   const xRange = [x-1, x, x+1]
   const yRange = [y-1, y, y+1]
   const zRange = [z-1, z, z+1]
   const wRange = [w-1, w, w+1]
   
   const coords = []
   for (let xIndex = 0; xIndex < xRange.length; xIndex++) {
        for (let yIndex = 0; yIndex < yRange.length; yIndex++) {
            for (let zIndex = 0; zIndex < zRange.length; zIndex++) {
                for (let wIndex = 0; wIndex < wRange.length; wIndex++) {
                    coords.push({x: xRange[xIndex], y: yRange[yIndex], z: zRange[zIndex], w: wRange[wIndex]})
                }
            }
        }
   }

   return coords
    .filter(item => !(item.x === x && item.y === y && item.z === z && item.w === w))
    .map(coord => {
        const existingItem = grid.find(item => item.x === coord.x && item.y === coord.y && item.z === coord.z && item.w === coord.w)

        if (existingItem) {
            return existingItem.state
        } else {
            grid.push({x: coord.x, y: coord.y, z: coord.z, w: coord.w, state: '.'})
            return '.'
        }
   })
}

grid.forEach(item => getOrInitNeighbours(item.x, item.y, item.z, item.w))

// This is sloooooooooow....
for (let i = 0; i < 6; i++) {

    const updatedGridItems = []
    const gridLength = grid.length
    
    for (let x = 0; x < gridLength; x++) {
        const gridItem = grid[x]
        const neighbours = getOrInitNeighbours(gridItem.x, gridItem.y, gridItem.z, gridItem.w)

        const actives = neighbours.filter(item => item === "#").length
        if (gridItem.state === "#" && !(actives === 2 || actives === 3)) {
            updatedGridItems.push({...gridItem, state: '.'})
            continue;
        }

        if (gridItem.state === "." && actives === 3) {
            updatedGridItems.push({...gridItem, state: "#"})
            continue;
        }
    }

    updatedGridItems.forEach(item => {
        const index = grid.findIndex(gItem => gItem.x === item.x && gItem.y === item.y && gItem.z === item.z && gItem.w === item.w)
        grid.splice(index, 1, item)
    })
}

console.log("Part 2", grid.filter(item => item.state === "#").length)