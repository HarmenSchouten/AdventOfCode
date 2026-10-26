import "../utils/index.ts"
const input = await Deno.readTextFile("./day13/input.txt")

const happyLookup: Record<string, Record<string, number>> = {}

input
    .splitLb()
    .forEach(l => {
        const [person,, dev, amount, ...rest] = l.split(" ")
        const other = rest[rest.length - 1].slice(0, -1)
        const sign = dev === "gain" ? 1 : -1
        happyLookup[person] = happyLookup[person] || {}
        happyLookup[person][other] = sign * Number(amount)
    })

const uniquePeople = Object.keys(happyLookup)

uniquePeople.forEach(p => {
    happyLookup["Me"] = happyLookup["Me"] || {}
    happyLookup["Me"][p] = 0
    happyLookup[p]["Me"] = 0
})

uniquePeople.push("Me")

const permutator = (inputArray: string[]) => {
    const result = [] as string[][]

    const permute = (array: string[], m: string[] = []) => {
        if (array.length === 0) {
            result.push(m)
        } else {
            for (let i = 0; i < array.length; i++) {
                const curr = array.slice()
                const next = curr.splice(i, 1)
                permute(curr.slice(), m.concat(next))
            }
        }
    }
    permute(inputArray)
    return result
}

const answer = permutator(uniquePeople)
    .reduce((acc, seatingArrangement) => {
        const total = seatingArrangement.reduce((acc, state, idx, arr) => {
            const left = arr[(idx - 1 + arr.length) % arr.length]
            const right = arr[(idx + 1) % arr.length]
            return acc + happyLookup[state][left] + happyLookup[state][right]
        }, 0)

        return Math.max(acc, total)
    }, 0)

console.log(answer)
