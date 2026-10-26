import "../utils/index.ts"
const input = await Deno.readTextFile("Day11/input.txt");

const devices = input
    .splitLb()
    .map(x => {
        const [left, right] = x.split(': ')

        return {
            in: left,
            out: right.split(" ")
        }
    })

const queue = [["you"]]
const visited = new Set<string>()
let answer = 0;

while (queue.length)
{
    const next = queue.shift()!;
    const currentKey = next.join(".")

    if (visited.has(currentKey)) continue

    const device = next[next.length - 1]
    for (const target of devices.find(x => x.in === device)!.out)
    {
        if (next.includes(target)) continue;

        if (target === "out") {
            answer++;
            continue;
        }

        queue.push([...next, target])
    }
}

console.log(answer)