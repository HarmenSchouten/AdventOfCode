const text = await Deno.readTextFile("./Day01/input.txt")
const treshold = 2020

const numbers = text
    .split("\r\n")
    .map(item => Number(item))
   

let answer = 0

for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
        for (let x = 0; x < numbers.length; x++) {
            if (numbers[i] + numbers[j] + numbers[x] === treshold) {
                answer =  numbers[i] * numbers[j] * numbers[x]
                break;
            }
        }
    }
}

console.log("Part 2: ", answer)