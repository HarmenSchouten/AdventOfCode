import "../utils/index.ts"
const input = await Deno.readTextFile("./day19/input.txt")

const [combinationStr, molecule] = input.split("\r\n\r\n")

const combinations = combinationStr.split("\r\n").map(x => {
    const [left, right] = x.split(" => ")

    return { left, right }
})

const resultStrings = new Set<string>()

combinations
    .forEach(state => {
        let startIdx = 0
        
        while (true)
        {
            const idx = molecule.indexOf(state.left, startIdx)
            if (idx < 0) break;

            const newStr = molecule.slice(0, idx) + state.right + molecule.slice(idx + state.left.length)
            resultStrings.add(newStr)
            startIdx += state.left.length
        }
    }, 0)

console.log(resultStrings.size)