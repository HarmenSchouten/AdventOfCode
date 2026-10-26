import "../utils/index.ts"

const input = await Deno.readTextFile("./day23/input.txt")

const instructions = input.splitLb().map(line => {
    const parts = line.split(/[, ]+/)
    return {
        cmd: parts[0],
        arg1: parts[1],
        arg2: parts[2] ? parseInt(parts[2]) : parseInt(parts[1])
    }
})

const registers = { a: 1, b: 0 } as Record<string, number>
let instructionIdx = 0

while (instructionIdx < instructions.length) {
    const { cmd, arg1, arg2 } = instructions[instructionIdx]

    switch (cmd) {
        case "hlf":
            registers[arg1] = Math.floor(registers[arg1] / 2)
            instructionIdx++
            break
        case "tpl":
            registers[arg1] *= 3
            instructionIdx++
            break
        case "inc":
            registers[arg1]++
            instructionIdx++
            break
        case "jmp":
            instructionIdx += arg2
            break
        case "jie":
            instructionIdx += registers[arg1] % 2 === 0 ? arg2 : 1
            break
        case "jio":
            instructionIdx += registers[arg1] === 1 ? arg2 : 1
            break
    }
}

console.log(registers)