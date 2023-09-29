const text = await Deno.readTextFile("./Day16/input.txt")

const parts = text.split("\r\n\r\n").map(item => item.split("\r\n"))

const rules = parts[0].map(item => {
    const [key, rest] = item.split(": ")
    const [rule1, rule2] = rest.split(" or ")
    const [rule1Min, rule1Max] = rule1.split("-")
    const [rule2Min, rule2Max] = rule2.split("-")
    return {
        key: key, 
        rule1Min: Number(rule1Min), 
        rule1Max: Number(rule1Max), 
        rule2Min: Number(rule2Min), 
        rule2Max: Number(rule2Max)}
})

const myTicket = parts[1].slice(1).flatMap(item => item.split(",").map(Number))

const validTickets = parts[2]
    .slice(1)
    .map(item => item.split(",").map(Number))
    .filter(item => item.filter(item => !rules.some(rule => 
        (rule.rule1Min <= item && rule.rule1Max >= item) 
        || (rule.rule2Min <= item && rule.rule2Max >= item))).length === 0)

validTickets.push(myTicket)

const fieldCount = validTickets[0].length
let ruleIndices = rules.reduce((acc, rule) => {
    const indices = []
    for (let i = 0; i <= fieldCount; i++) {
        const isIndex = validTickets.every(ticket => 
            (rule.rule1Min <= ticket[i] && rule.rule1Max >= ticket[i]) 
            || (rule.rule2Min <= ticket[i] && rule.rule2Max >= ticket[i]))

        if (isIndex) {
            indices.push(i)
        }
    }

    acc.push({key: rule.key, indices})

    return acc;
}, [] as {key: string, indices: number[]}[])

let ruleMap = ruleIndices
    .filter(item => item.indices.length === 1)
    .map(item => ({key: item.key, index: item.indices[0]}))

while (true) {
    ruleMap.forEach(rule => {
        ruleIndices = ruleIndices.map(item => ({
            ...item, 
            indices: item.key !== rule.key
                ? item.indices.filter(item => item !== rule.index)
                : item.indices}))
    })

    ruleMap = ruleIndices
        .filter(item => item.indices.length === 1)
        .map(item => ({key: item.key, index: item.indices[0]}))
    
    if (ruleIndices
        .filter(item => item.key.startsWith("departure"))
        .every(item => item.indices.length === 1)) {
        break;
    }
}

const answer = myTicket
    .map((item, idx) => {
        const mappedRule = ruleMap.find(item => item.index === idx);
        if (!mappedRule) return undefined
        return { key: mappedRule.key, value: item }
    })
    .filter(item => item !== undefined && item.key.startsWith("departure"))
    .reduce((acc, state) => {
        if (acc === 0) return acc += state?.value ?? 0
        return acc *= state?.value ?? 0
    }, 0)

console.log("Part 2", answer)