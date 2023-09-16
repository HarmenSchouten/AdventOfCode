const text = await Deno.readTextFile("./Day04/input.txt")

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]

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
        && requiredFields.every(field => passport[field] !== undefined))
    .length

console.log("Part 1:", validPassports)