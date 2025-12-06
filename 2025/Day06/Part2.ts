import "../utils/index.ts"
const input = await Deno.readTextFile("Day06/input.txt");

const lines = input.splitLb();
const numberLines = lines.slice(0, lines.length - 1)
const operatorLine = lines[lines.length - 1];

let answer = 0;
for (let i = 0; i < operatorLine.length; i++) {
    const operator = operatorLine[i];

    let nextOperatorIdx = i + 1;
    while (nextOperatorIdx < operatorLine.length && operatorLine[nextOperatorIdx] === ' ') {
        nextOperatorIdx++;
    }
    const endIdx = nextOperatorIdx === operatorLine.length 
        ? nextOperatorIdx 
        : nextOperatorIdx-1;

    const column = numberLines.map(l => l.slice(i, endIdx))
    const items = Array
        .from({ length: column[0].length }, () => [])
        .reduce((acc, _, idx) => {
            acc.push(column.map(l => l[idx]).join(''));
            return acc;
        }, [] as string[]);

    answer += eval(items.join(operator));

    i = nextOperatorIdx - 1;
}

console.log(answer)