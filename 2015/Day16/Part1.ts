import "../utils/index.ts"
const input = await Deno.readTextFile("./day16/input.txt")

const check = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1
} as Record<string, number>

const winningSue = input
    .splitLb()
    .map(line => {
        const matches = line.match(/(Sue (\d+))|(\w+: \d+)/g)!

        return {
            id: matches[0].ints().at(0),
            data: [...matches]
                .map(x => x.split(": "))
                .slice(1)
                .reduce((acc, state) => ({ ...acc, [state[0]]: parseInt(state[1]) }), {} as Record<string, number>)
        }
    })
    .sort((a, b) => {
        const scoreA = Object.entries(a.data).reduce((acc, [key, value]) => {
            return acc + (check?.[key] === value ? 1 : 0)
        }, 0)

        const scoreB = Object.entries(b.data).reduce((acc, [key, value]) => {
            return acc + (check?.[key] === value ? 1 : 0)
        }, 0)

        return scoreB - scoreA
    })
    .at(0)!.id

console.log(winningSue)