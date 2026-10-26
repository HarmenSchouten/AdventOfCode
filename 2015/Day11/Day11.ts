import "../utils/index.ts"
const input = await Deno.readTextFile("./Day11/input.txt")

const alphabet = 'abcdefghijklmnopqrstuvwxyz'
const blacklist = 'iol'

const increment = (input: string) => {

    let inputArr = input.split('')

    const last = inputArr[input.length - 1]

    if (last !== 'z') {
        inputArr[input.length - 1] = alphabet[alphabet.indexOf(last) + 1]
    } else {
        inputArr = inputArr
            .reverse()
            .map((x, idx, self) => {
                if (x === 'z') return 'a'
                if (self[idx - 1] === 'z') return alphabet[alphabet.indexOf(x) + 1]
                return x
            })
            .reverse()
    }

    const firstBlackListIdx = inputArr.findIndex(x => blacklist.includes(x))

    if (firstBlackListIdx === -1) return inputArr.join('')

    return inputArr
        .map((x, idx) => {
            if (idx < firstBlackListIdx) return x
            if (idx === firstBlackListIdx) return alphabet[alphabet.indexOf(x) + 1]
            return 'a'
        })
        .join('')
}

const validate = (input: string) => {
    const inputArr = input.split('');

    const hasIncreasingLetter = inputArr.some((x, idx) => {
        if (idx + 2 > inputArr.length - 1) return false;

        const block = `${x}${inputArr[idx + 1]}${inputArr[idx + 2]}`
        return alphabet.includes(block)
    })

    if (!hasIncreasingLetter) return false;

    const pairs = inputArr
        .filter((x, idx) => {
            const prev = inputArr?.[idx - 1]
            const next = inputArr?.[idx + 1]

            const isPair = (!prev || prev !== x) && (next !== undefined && next === x)

            if (isPair) return x
        })
        .filter((x, idx, self) => self.indexOf(x) === idx)

    return pairs.length >= 2
}

const valids = []
let password = input
while (valids.length < 2) {
    password = increment(password)
    const isValid = validate(password)
    if (isValid) valids.push(password)
}

console.log("Part 1:", valids[0])
console.log("part 2:", valids[1])