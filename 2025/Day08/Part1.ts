import "../utils/index.ts"
const input = await Deno.readTextFile("Day08/input.txt");

const junctionBoxes = input
    .splitLb()
    .map(l => {
        const [x, y, z] = l.ints();
        return { x, y, z };
    })

const euclidean = (p1: { x: number, y: number, z: number }, p2: { x: number, y: number, z: number }) => {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    const dz = p1.z - p2.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

const distances = [] as { dist: number, p1: number, p2: number }[];
for (let i = 0; i < junctionBoxes.length; i++) {
    for (let j = i + 1; j < junctionBoxes.length; j++) {
        const dist = euclidean(junctionBoxes[i], junctionBoxes[j]);
        distances.push({ dist, p1: i, p2: j });
    }
}

const circuits = junctionBoxes.map((_, i) => [i])
const connections = junctionBoxes.length === 20 ? 10 : 1000
distances.sort((a, b) => a.dist - b.dist)

for (let i = 0; i < connections; i++) {
    const d1 = distances[i];
    const circuit1 = circuits.find(c => c.includes(d1.p1))!;
    const circuit2 = circuits.find(c => c.includes(d1.p2))!;

    if (circuit1 !== circuit2) {
        const merged = [...circuit1, ...circuit2]
        circuits.splice(circuits.indexOf(circuit1), 1);
        circuits.splice(circuits.indexOf(circuit2), 1);
        circuits.push(merged);
    }
}

const sorted = circuits.sort((a, b) => b.length - a.length)
console.log(sorted[0].length * sorted[1].length * sorted[2].length);