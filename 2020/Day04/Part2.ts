const text = await Deno.readTextFile("./Day04/input.txt")

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]

const isKeyValueValid = (key: string, value: string) => {
    switch (key) {
        case "byr":
            {
                const number = Number(value)
                return !isNaN(number) && value.length === 4 && number >= 1920 && number <= 2002
            }
        case "iyr": 
            {
                const number = Number(value)
                return !isNaN(number) && value.length === 4 && number >= 2010 && number <= 2020
            }
        case "eyr":
            {
                const number = Number(value)
                return !isNaN(number) && value.length === 4 && number >= 2020 && number <= 2030
            }
        case "hgt": 
            {
                if (value.endsWith("cm")) {
                    const number = Number(value.split("cm")[0])
                    return !isNaN(number) && number >= 150 && number <= 193
                } else if (value.endsWith("in")) {
                    const number = Number(value.split("in")[0])
                    return !isNaN(number) && number >= 59 && number <= 76
                }
                return false;
            }
        case "hcl": 
            {
                const sliced = [...value.slice(1)]
                return value.startsWith("#") && sliced.length === 6 && sliced.every(char => {
                    const charCode = char.charCodeAt(0)
                    return charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102
                })
            }
        case "ecl": return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(value)
        case "pid": return value.length === 9 && !isNaN(Number(value))
        case "cid": return true;
        default: return false
    }
}

const validPassports = text
    .split("\r\n\r\n")
    .map(item => item.replaceAll("\r\n", " "))
    .map(item => {
        const items = item.split(" ")
        const passport = {} as Record<string, string>
        items.forEach(subItem => {
            const [key, value] = subItem.split(":")
            passport[key] = value
        })
        return passport
    })
    .filter(passport => 
        Object.keys(passport).length >= 7 
        && requiredFields.every(field => 
            passport[field] !== undefined 
            && isKeyValueValid(field, passport[field])))
    .length

console.log("Part 2:", validPassports)

