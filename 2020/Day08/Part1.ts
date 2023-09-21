const text = await Deno.readTextFile("./Day08/input.txt")

const instructions = text
    .split("\r\n")
    .map(item => {
        const [command, action] = item.split(" ")
        return {
            command: command,
            action: Number(action)
        }
    })
    
let accumulator = 0, index = 0;
const instructionSet = new Set<{command: string, action: number}>()

while (index < instructions.length) {
    const instruction = instructions[index]

    if (instructionSet.has(instruction)) {
        break;
    }

    instructionSet.add(instruction)

    if (instruction.command === "nop") {
        index++;
        continue;
    }
    if (instruction.command === "acc") {
        accumulator += instruction.action
        index++
        continue;
    }
    if (instruction.command === "jmp") {
        index += instruction.action
        continue;
    }
}

console.log("Part 1", accumulator)