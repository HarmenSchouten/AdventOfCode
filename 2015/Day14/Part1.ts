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
            iterationDist: flyTime * fly
        }
    })

const maxTime = 2503

const winning = parsed.reduce((acc, state) => {

    const maxIterations = Math.floor(maxTime / state.iterationTime)
    const time = maxIterations * state.iterationTime
    let distance = maxIterations * state.iterationDist

    const remainingTime = maxTime - time;
    const remainingFlyTime = remainingTime < state.flyTime ? remainingTime : state.flyTime

    distance += remainingFlyTime * state.fly

    return Math.max(acc, distance)
}, 0)

console.log(winning)
