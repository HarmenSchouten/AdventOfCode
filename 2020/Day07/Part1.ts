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

const matches = new Set<string>()
const findMatch = (color: string) => {
    const matchingWrapper = bags.filter(item => item.containing.some(item => item.color === color && item.count >= 1))

    matchingWrapper.forEach(item => {
        matches.add(item.wrapperColor)
        findMatch(item.wrapperColor)
    })
}

findMatch("shiny gold")

console.log("Part 1", matches.size)