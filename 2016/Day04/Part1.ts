import "../../utils/index.ts"

const input = await Deno.readTextFile(new URL("./input.txt", import.meta.url))

const answer = input
    .splitLb()
    .map(x => {
        const sectorId = x.ints()[0]
        const name = x.slice(0, x.indexOf(`${sectorId}`) - 1)
        const checkSum = x.slice(x.indexOf('[') + 1, -1)
        return { sectorId, name, checkSum }
    })
    .filter(x => {
        const counts = new Map<string, number>();
        [...x.name].forEach(char => {
            if (char === '-') return
            counts.set(char, (counts.get(char) ?? 0) + 1)
        });
        const check = [...counts.entries()]
            .sort(([kA, a], [kB, b]) => b - a || kA.localeCompare(kB))
            .map(([char]) => char)
            .slice(0, 5)
            .join('')

        return check === x.checkSum
    })
    .reduce((acc, state) => acc + state.sectorId, 0)

console.log(answer)