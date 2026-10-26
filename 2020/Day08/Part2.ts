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
    
const answer = instructions.reduce((acc, state, idx, arr) => {
    if (acc != 0) return acc
    
    // Fuck TS/JS
    const instructionsCopy = JSON.parse(JSON.stringify(arr))

    if (state.command === "nop") instructionsCopy[idx].command = "jmp"
    else if (state.command === "jmp") instructionsCopy[idx].command = "nop"
    
    let accumulator = 0, index = 0;
    const instructionSet = new Set<{command: string, action: number}>()

    while (index < instructionsCopy.length) {
        const instruction = instructionsCopy[index]

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

    if (index >= instructionsCopy.length - 1) return accumulator
    return acc
}, 0)

console.log("Part 2", answer)