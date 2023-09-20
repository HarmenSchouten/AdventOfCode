const text = await Deno.readTextFile("./Day07/input.txt")

const bags = text
    .split("\r\n")
    .map(item => {
        const [wrapper, containing] = item.split(" contain ")
        const wrapperColor = wrapper.split(" bags")[0]
        const containginItems = containing.startsWith("no")
            ? []
            : containing
                .split(", ")
                .map(item => item.split(" "))
                .map(item => ({ count: Number(item[0]), color: `${item[1]} ${item[2]}` }))
        return { wrapperColor: wrapperColor, containing: containginItems }
    })

const containingReducer = (color: string) =>    
    bags
        .filter(item => item.wrapperColor === color)
        .reduce((acc, state) => {
            state.containing.forEach(item => acc += item.count * containingReducer(item.color) + item.count)
            return acc;
        }, 0)

console.log("Part 2", containingReducer("shiny gold"))
