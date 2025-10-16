import "../utils/index.ts"
const input = await Deno.readTextFile("./day14/input.txt")

const parsed = input
    .splitLb()
    .map(l => {
        const name = l.slice(0, l.indexOf(" "))
        const [fly, flyTime, restTime] = l.ints()
        return {
            name: name,
            fly,
            flyTime,
            restTime,
            iterationTime: flyTime + restTime,
            iterationDist: flyTime * fly,
            score: 0
        }
    })

const score = (
    time: number,
    iterationTime: number,
    iterationDist: number,
    flyTime: number,
    speed: number
) => {
    const maxIterations = Math.floor(time / iterationTime)
    const usedTime = maxIterations * iterationTime
    let distance = maxIterations * iterationDist

    const remainingFlyTime = Math.min(time - usedTime, flyTime)

    distance += remainingFlyTime * speed
    return distance;
}

const scores = {} as Record<string, number>

for (let i = 1; i <= 2503; i++) {
    const results = parsed.map(p => ({ name: p.name, score: score(i, p.iterationTime, p.iterationDist, p.flyTime, p.fly) }))
    const max = Math.max(...results.map(x => x.score))
    results.filter(x => x.score === max).forEach(x => scores[x.name] = (scores?.[x.name] ?? 0) + 1)
}

console.log(Math.max(...Object.values(scores)))
