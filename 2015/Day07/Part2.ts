import "../utils/index.ts"
const input = await Deno.readTextFile("./day07/input.txt")

const wires = new Map<string, number>()
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
    if (wires.has(value)) return wires.get(value)!;
    return findValueForWire(value)
}

const findValueForWire = (wireCode: string):number => {
    const wireIn = parsed.find(item => item.out === wireCode)!

    if (wireIn.op === 'SET') {
        const v = tryGetValue(wireIn.in!.isNumber, wireIn.in!.value)
        wires.set(wireIn.out, v)
        return v
    }
    if (wireIn.op === "NOT") {
        const v = tryGetValue(wireIn.in!.isNumber, wireIn.in!.value)
        const res = ~v & 0xFFFF
        wires.set(wireIn.out, res)
        return res
    }

    const 
        v1 = tryGetValue(wireIn.in1!.isNumber, wireIn.in1!.value),
        v2 = tryGetValue(wireIn.in2!.isNumber, wireIn.in2!.value)

    let v;
    if (wireIn.op === "AND") v = (v1 & v2) & 0xFFFF
    else if (wireIn.op === "OR") v = (v1 | v2) & 0xFFFF
    else if (wireIn.op === "LSHIFT") v = (v1 << v2) & 0xFFFF
    else if (wireIn.op === "RSHIFT") v = (v1 >> v2) & 0xFFFF
    else throw new Error("QUE?!")    
    wires.set(wireIn.out, v)
    return v;
}

const result = findValueForWire('a')
wires.clear()
wires.set('b', result)
console.log(findValueForWire('a'))