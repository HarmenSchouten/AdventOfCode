const text = await Deno.readTextFile("./Day10/input.txt")

const numbers = text
    .split("\r\n")
    .map(Number)
    .sort((a, b) => a - b)

const max = numbers[numbers.length - 1] + 3
numbers.push(max)
let items = [{val: 0, count: 1}] as {val: number, count: number}[]

while (true) {
    const newItems = []
    for (let i = 0; i < items.length; i++) {
        const currItem = items[i]
        if (currItem.val === max) {
            newItems.push(currItem)
            continue
        }

        const nextOptions = numbers.filter(i =>
            i === currItem.val + 1
            || i === currItem.val + 2
            || i === currItem.val + 3)

        for (let i = 0; i < nextOptions.length; i++) {
            const index = newItems.findIndex(item => item.val === nextOptions[i])
            if (index !== -1) {
                newItems[index].count = newItems[index].count + currItem.count
            } else {
                newItems.push({val: nextOptions[i], count: currItem.count})
            }

        }
    }

    items = newItems
    if (items.every(i => i.val === max)) break;
}

console.log("Part 2", items.reduce((acc, state) => acc += state.count, 0))