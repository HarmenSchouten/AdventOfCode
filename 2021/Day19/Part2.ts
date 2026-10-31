import "../../utils/index.ts"

const input = await Deno.readTextFile(new URL("./input.txt", import.meta.url))

type Vec = number[]

const scanners = input
    .splitDlb()
    .map(s => {
        const [_, ...beacons] = s.splitLb()
        return beacons.map(x => x.split(',').map(Number))
    })

const perms = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]]
const parity = [1, -1, -1, 1, 1, -1]

const rotations: ((v: Vec) => Vec)[] = []
perms.forEach((p, idx) => {
    for (let s = 0; s < 8; s++) {
        const sign = [s & 1 ? -1 : 1, s & 2 ? -1 : 1, s & 4 ? -1 : 1]
        if (parity[idx] * sign[0] * sign[1] * sign[2] !== 1) continue;
        rotations.push(v => [sign[0] * v[p[0]], sign[1] * v[p[1]], sign[2] * v[p[2]]])
    }
})

const pack = (x: number, y: number, z: number) => ((x + 16384) * 32768 + (y + 16384)) * 32768 + (z + 16384)

const findOffset = (known: Vec[], form: Vec[]) => {
    const offsets = new Map<number, number>()
    for (const beacon of form) {
        for (const knownBeacon of known) {
            const x = knownBeacon[0] - beacon[0]
            const y = knownBeacon[1] - beacon[1]
            const z = knownBeacon[2] - beacon[2]
            const key = pack(x, y, z)
            const score = (offsets.get(key) ?? 0) + 1
            if (score === 12) return [x, y, z]
            offsets.set(key, score)
        }
    }
}

const located = { 0: scanners[0] } as Record<number, Vec[]>
const queue = [0] as number[]
const unlocated = new Set(scanners.map((_, idx) => idx).slice(1))
const positions = { 0: [0, 0, 0] } as Record<number, number[]>

while (queue.length > 0) {
    const known = located[queue.shift()!]
    for (const id of [...unlocated]) {
        for (const rotation of rotations) {
            const form = scanners[id].map(rotation)
            const offset = findOffset(known, form)
            if (!offset) continue

            located[id] = form.map(beacon => beacon.map((num, idx) => num + offset[idx]))
            positions[id] = offset
            unlocated.delete(id)
            queue.push(id)
            break;
        }
    }
}

let answer = 0
const manhattan = (a: Vec, b: Vec) => a.reduce((s, v, i) => s + Math.abs(v - b[i]), 0)
for (let i = 0; i < Object.keys(positions).length; i++) {
    for (let j = i + 1; j < Object.keys(positions).length; j++) {
        answer = Math.max(manhattan(positions[i], positions[j]), answer)
    }
}

console.log(answer)