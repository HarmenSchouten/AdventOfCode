import "../../utils/index.ts"

const input = await Deno.readTextFile(new URL("./input.txt", import.meta.url))

const alphabet = 'abcdefghijklmnopqrstuvwxyz'

const parsed = input
    .splitLb()
    .map(x => {
        const sectorId = x.ints()[0]
        const name = x.slice(0, x.indexOf(`${sectorId}`) - 1)
        return { sectorId, name }
    })

const answer = parsed
    .find(state => {
        const remainder = state.sectorId % alphabet.length
        const name = [...state.name].map(x => {
            return x === '-'
                ? ' '
                : alphabet[((alphabet.indexOf(x) + remainder) % alphabet.length)]
        }).join('')
        return name.includes('north')
    })
    ?.sectorId

console.log(answer)

