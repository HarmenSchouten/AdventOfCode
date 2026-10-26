import "../../utils/index.ts"

const text = await Deno.readTextFile(new URL("./input.txt", import.meta.url))

const lines = text
    .splitLb()
    .map(line => Number(line.split(": ")[1].split("").filter(item => item.isDigit()).join("")))

const races = [{time: lines[0], distance: lines[1]}]

let answer = 0;
races.forEach(race => {
    for (let i = 0; i < race.time; i++) {
        if (((race.time - i) * i) > race.distance) {
            answer += 1
        }
    }
})

console.log(answer)