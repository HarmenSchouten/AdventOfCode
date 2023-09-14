const text = await Deno.readTextFile("./Day02/input.txt")

const isValid = (min: number, max: number, char: string, password: string) => {
    const count = password.split(char).length - 1
    return  count >= min && count <= max
}


const answer = text
    .split("\r\n")
    .map(item => {
        const [range, char, password] = item.split(" ")
        const [min, max] = range.split("-")
        return {
            min: Number(min),
            max: Number(max),
            char: char.split(":")[0],
            password: password
        }
    })
    .filter(item => isValid(item.min, item.max, item.char, item.password))
    .length

console.log("Part 1: ", answer)