const targetCol = 3083
const targetRow = 2978

let previous = 20151125
let previousCol = 1
let previousRow = 1

let maxRow = 1

const calculate = (previous: number) => previous * 252533 % 33554393

while (true) {

    if (previousCol === targetCol && previousRow === targetRow) break

    if (previousRow === 1)
    {
        maxRow += 1;
        previous = calculate(previous)
        previousRow = maxRow
        previousCol = 1
    } else {
        previous = calculate(previous)
        previousRow -= 1
        previousCol += 1 
    }
}

console.log(previous)