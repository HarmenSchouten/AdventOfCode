const text = await Deno.readTextFile("./Day02/input.txt")

const isValid = (index1: number, index2: number, char: string, password: string) => {
    const isOnIndex1 = password?.[index1] === char
    const isOnIndex2 = password?.[index2] === char
    return (!isOnIndex1 && isOnIndex2) || (isOnIndex1 && !isOnIndex2) 
}


const answer = text
    .split("\r\n")
    .map(item => {
        const [range, char, password] = item.split(" ")
        const [min, max] = range.split("-")
        return {
            index1: Number(min) - 1,
            index2: Number(max) - 1,
            char: char.split(":")[0],
            password: password
        }
    })
    .filter(item => isValid(item.index1, item.index2, item.char, item.password))
    .length

console.log("Part 2: ", answer)