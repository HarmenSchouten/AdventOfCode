import "../utils/index.ts"
const input = await Deno.readTextFile("Day10/input.txt");

const machines = input
    .splitLb()
    .map(l => {
        const [diagramStr, buttonStr, reqStr] = l.match(/(\[.+])|(\(.+\))|(\{.+\})/g)!
        const diagram = diagramStr.slice(1, -1).split(("")).map(x => x === '#' ? 1 : 0);
        const buttonIndices = buttonStr.split(' ').map(x => x.ints())
        const buttons = buttonIndices.reduce((acc, state) => {
            const array = new Array<string>(diagram.length).fill("0");
            for (const idx of state) {
                array[idx] = "1";
            }
            acc.push(parseInt(array.join(''), 2));
            return acc;
        }, [] as number[])

        return {
            diagram: diagram,
            value: parseInt(diagram.join(''), 2),
            buttons: buttons,
            requirements: reqStr.ints()
        }
    })

let answer = 0;

for (const machine of machines) {
    const start = 0
    const queue = [{ value: start, steps: 0 }];
    const seen = new Set<number>([start])

    while (queue.length > 0) {
        const { value, steps } = queue.shift()!;

        if (value === machine.value) {
            answer += steps;
            break;
        }

        for (const b of machine.buttons) {
            const newValue = value ^ b
            if (!seen.has(newValue)) {
                seen.add(newValue);
                queue.push({ value: newValue, steps: steps + 1 });
            }
        }
    }
}

console.log(answer)