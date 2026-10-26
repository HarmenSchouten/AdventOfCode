const text = await Deno.readTextFile("./Day16/input.txt")

const parts = text.split("\r\n\r\n").map(item => item.split("\r\n"))

const rules = parts[0].map(item => {
    const [key, rest] = item.split(": ")
    const [rule1, rule2] = rest.split(" or ")
    const [rule1Min, rule1Max] = rule1.split("-")
    const [rule2Min, rule2Max] = rule2.split("-")
    return {key: key, rule1Min: Number(rule1Min), rule1Max: Number(rule1Max), rule2Min: Number(rule2Min), rule2Max: Number(rule2Max)}
})

const count = parts[2]
    .slice(1)
    .map(item => item.split(",").map(Number))
    .reduce((acc, state) => {
        const invalidItems = state.filter(item => !rules.some(rule => 
            (rule.rule1Min <= item && rule.rule1Max >= item) 
            || (rule.rule2Min <= item && rule.rule2Max >= item)))

        invalidItems.forEach(item => acc += item)
        return acc;
    }, 0)


console.log("Part 1", count)