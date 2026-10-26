const text = await Deno.readTextFile("./Day18/input.txt")

const calculateResult = (input: string) => {

    while (true) {
        if (!input.includes("(")) break;

        const start = input.lastIndexOf("(")
        const end = input.indexOf(")", start)

        const result = calculateResult(input.slice(start + 1, end))
        input = input.slice(0, start) + result + input.slice(end + 1)
    }

    const inputArr = input.split(" ")

    while(true) {
        if (!(inputArr.includes("+") || inputArr.includes("-") || inputArr.includes("*"))) break;

        const operatorIndex = inputArr.findIndex(item => item === "+" || item === "-" || item === "*")
        inputArr.splice(operatorIndex - 1, 3, eval(inputArr.slice(operatorIndex - 1, operatorIndex + 2).join(" ")))
    }

    return eval(inputArr.join(" "))
}

const answer = text
    .split("\r\n")
    .reduce((acc, state) => acc += Number(calculateResult(state)), 0)

console.log("Part 1", answer)