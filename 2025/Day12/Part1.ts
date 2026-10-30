import "../../utils/index.ts"

const input = await Deno.readTextFile(new URL("./input.txt", import.meta.url))

const [box0, box1, box2, box3, box4, box5, regionsRaw] = input.splitDlb()

const boxes = [box0, box1, box2, box3, box4, box5]
    .map(x => [...x].filter(i => i === '#').length)

const answer = regionsRaw
    .splitLb()
    .filter(line => {
        const [x, y, ...rest] = line.ints()
        const spaceTaken = rest.map((x, idx) => x * boxes[idx]).sum()
        return spaceTaken <= (x * y)
    })
    .length

console.log(answer)