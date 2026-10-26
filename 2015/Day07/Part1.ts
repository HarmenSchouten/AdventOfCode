import "../utils/index.ts"
const input = await Deno.readTextFile("./day07/input.txt")

const wires = new Map<string, number>()
const visited = new Set<string>()
const parsed = input
    .splitLb()
    .map(item => {
        const [left, out] = item.split(" -> ")
        const matches = left.match(/^(\d+|[a-z]+)|(NOT|OR|AND|LSHIFT|RSHIFT)|([a-z]+|\d+)$/gm)!
        if (matches.length === 1) return {
            item,
            op: 'SET',
            in: { isNumber: !isNaN(Number(matches[0])), value: matches[0] },
            out
        }
        if (matches[0] === "NOT") return { 
            item, 
            op: matches[0], 
            in: { isNumber: !isNaN(Number(matches[1])), value: matches[1] }, 
            out 
        }
        return {
            item,
            op: matches[1],
            in1: { isNumber: !isNaN(Number(matches[0])), value: matches[0] },
            in2: { isNumber: !isNaN(Number(matches[2])), value: matches[2] },
            out
        }
    })

const tryGetValue = (isNumber: boolean, value: string) => {
    if (isNumber) return Number(value)
    return wires.get(value)
}

while (visited.size !== parsed.length) {
    parsed
        .filter(p => !visited.has(p.item))
        .forEach(line => {
            if (line.op === 'SET') {
                const v = tryGetValue(line.in!.isNumber, line.in!.value)
                if (v === undefined) return
                wires.set(line.out, v)
                visited.add(line.item)
                return;
            }
            if (line.op === "NOT") {
                const v = tryGetValue(line.in!.isNumber, line.in!.value)
                if (v === undefined) return
                wires.set(line.out, ~v & 0xFFFF)
                visited.add(line.item)
                return;
            } 

            const 
                v1 = tryGetValue(line.in1!.isNumber, line.in1!.value),
                v2 = tryGetValue(line.in2!.isNumber, line.in2!.value)

            if (v1 === undefined || v2 === undefined) return
                
            visited.add(line.item)
            if (line.op === "AND") wires.set(line.out, (v1 & v2) & 0xFFFF)
            else if (line.op === "OR") wires.set(line.out, (v1 | v2) & 0xFFFF)
            else if (line.op === "LSHIFT") wires.set(line.out, (v1 << v2) & 0xFFFF)
            else if (line.op === "RSHIFT") wires.set(line.out, (v1 >> v2) & 0xFFFF)
        })
}
console.log(wires.get('a'))