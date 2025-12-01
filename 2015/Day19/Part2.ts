import "../utils/index.ts"
const input = await Deno.readTextFile("./day19/input.txt")

const [combinationStr, molecule] = input.split("\r\n\r\n")

const combinations = combinationStr.split("\r\n").map(x => {
    const [left, right] = x.split(" => ")

    return { left, right }
})

// Fisher–Yates
const shuffle = (arr: typeof combinations) => {
    let currentIndex = arr.length;

    while (currentIndex != 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);

        currentIndex--;

        [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
    }
}

shuffle(combinations)
let testString = molecule;
let i = 0, j = 0;

while (testString !== "e") {
    for (const combo of combinations) {
        if (testString.includes(combo.right)) {
            testString = testString.replace(combo.right, combo.left);
            i++;
        }
    }

    if (i === j) {
        testString = molecule, i = 0, j = 0
        shuffle(combinations)
    } else {
        j = i
    }
}

console.log(i)