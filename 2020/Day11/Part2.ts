const text = await Deno.readTextFile("./Day11/input.txt")

let seats = text.split("\r\n").map(item => [...item])

const getOccupiedAdjacentSeats = (x: number, y: number) => {
    const adjacentSeats = []
    adjacentSeats.push(seats.filter((_, idx) => idx === y)?.[0].findLast((item, idx) => idx < x && item !== "."))
    adjacentSeats.push(seats.filter((_, idx) => idx === y)?.[0].find((item, idx) => idx > x && item !== "."))
    adjacentSeats.push(seats.filter((_, idx) => idx < y).findLast(item => item[x] !== ".")?.[x])
    adjacentSeats.push(seats.filter((_, idx) => idx > y).find(item => item[x] !== ".")?.[x])

    const getDiagonalSeat = (xIncrease: number, yIncrease: number, x: number, y: number) => {
        let foundSeat
        while (true) {
            x += xIncrease
            y += yIncrease

            const seat = seats[y]?.[x]
            if (seat === undefined) break;
            if (seat !== ".") {
                foundSeat = seat;
                break;
            }
        }
        return foundSeat
    }

    adjacentSeats.push(getDiagonalSeat(-1, -1, x, y))
    adjacentSeats.push(getDiagonalSeat(1, -1, x, y))
    adjacentSeats.push(getDiagonalSeat(-1, 1, x, y))
    adjacentSeats.push(getDiagonalSeat(1, 1, x, y))
    
    return adjacentSeats.filter(seat => seat === "#")
}

let hasChanged = true;
while (hasChanged) {
    hasChanged = false;

    const seatsCopy = JSON.parse(JSON.stringify(seats))
    seats.forEach((row, y) => {
        row.forEach((seat, x) => {
            if (seat === 'L' && getOccupiedAdjacentSeats(x, y).length === 0) {
                seatsCopy[y][x] = "#"
                hasChanged = true
            }
            if (seat === '#' && getOccupiedAdjacentSeats(x, y).length >= 5) {
                seatsCopy[y][x] = "L"
                hasChanged = true
            }
        })
    })

    seats = seatsCopy

    if (!hasChanged) break;
}

console.log("Part 2", seats.reduce((acc, state) => acc += state.filter(item => item === "#").length, 0))