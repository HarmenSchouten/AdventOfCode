const text = await Deno.readTextFile("./Day19/input.txt")

const parts = text.split("\r\n\r\n")

const rules = parts[0]
    .split("\r\n")
    .map(item => {
        const [key, rest] = item.split(": ")
        const isValue = rest.includes("\"")

        if (isValue) {
            return {
                key: Number(key),
                isValue: isValue,
                value: rest.replaceAll("\"", "")
            }
        }
        const rules = rest.split(" | ")
        return {
            key: Number(key),
            isValue: isValue,
            rule1: rules[0].split(" ").map(String),
            rule2: rules[1]?.split(" ")?.map(String)
        }
    })

const finalRule = [] as number[]

const find = (key: number) => {
    const rule = rules.find(item => item.key === key)

    if (rule?.isValue) return rule.value

    let a1;
    if (!rule?.isValue && rule?.rule1) {
        a1 = rule.rule1.map(item => find(Number(item)))
    }

    let a2;
    if (!rule?.isValue && rule?.rule2) {
        a2 = rule.rule2.map(item => find(Number(item)))
    }

    return [a1, a2]
}

const rule = find(0)[0]
console.log(JSON.stringify(rule))

const input = [] as string[]

