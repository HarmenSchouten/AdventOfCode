import "../utils/index.ts"
const input = await Deno.readTextFile("./day09/input.txt")

const distances = input
    .splitLb()
    .reduce((acc, state) => {
        const [left, cost] = state.split(" = ")
        const [from, to] = left.split(" to ")

        acc[from] = acc[from] || {}
        acc[to] = acc[to] || {}

        acc[from][to] = Number(cost)
        acc[to][from] = Number(cost)

        return acc;
    }, {} as Record<string, Record<string, number>>)

const permutations = (array: string[]) => {
    if (array.length > 1) {
        const newArray = [] as string[][]
        array.forEach((item, idx) => {
            permutations(array.slice(0, idx).concat(array.slice(idx + 1)))
                .forEach(nsa => newArray.push([item].concat(nsa)))
        })
        return newArray;
    }
    return [array]
}

const locations = Object.keys(distances)
const routes = permutations(locations)
    .map(route => {
        const options = route.reduce((acc, location) => {
            return {
                prevLoc: location,
                totalDistance: acc.totalDistance + (acc.prevLoc ? distances[acc.prevLoc][location] : 0)
            }
        }, { prevLoc: undefined, totalDistance: 0 } as { prevLoc?:string, totalDistance: number })
        return options.totalDistance
    });

const shortestRoute = routes.reduce((acc, route) => route < acc ? route : acc, 999999999999999);

console.log(shortestRoute)
