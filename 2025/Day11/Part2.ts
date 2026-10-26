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

const visited = new Map<string, number>()

const key = (dev: string, dac: boolean, fft: boolean) =>
    `${dev}.${dac}.${fft}`

const run = (dev: string, dac: boolean, fft: boolean) => {
    if (dev === "out") {
        return dac && fft ? 1 : 0
    }

    const 
        reachedDac = dac || dev === "dac",
        reachedFft = fft || dev === "fft"

    const runKey = key(dev, reachedDac, reachedFft)

    if (visited.has(runKey)) {
        return visited.get(runKey)!
    }

    let count = 0;
    for (const target of devices.find(x => x.in === dev)?.out ?? []) {
        count += run(target, reachedDac, reachedFft)
    }

    visited.set(runKey, count)

    return count;
}

const answer = run("svr", false, false)
console.log(answer)