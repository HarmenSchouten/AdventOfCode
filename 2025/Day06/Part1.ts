import "../utils/index.ts"
const input = await Deno.readTextFile("Day06/input.txt");

const parsed = input
    .splitLb()
    .reduce((acc, line, idx, self) => {
        if (idx === self.length - 1) {
            acc.operators = [...line.match(/\*|\+/g)!]
        } else {
            acc.lines.push(line.ints())
        }
        return acc
    }, { lines: [], operators: [] } as { lines: number[][], operators: string[] })

let answer = 0
for (let i = 0; i < parsed.lines[0].length; i++) {
    answer += eval(parsed.lines.map(l => l[i]).join(parsed.operators[i]))
}

console.log(answer)