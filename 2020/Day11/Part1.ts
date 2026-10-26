const text = await Deno.readTextFile("./Day11/input.txt")

let seats = text.split("\r\n").map(item => [...item])

const getOccupiedAdjacentSeats = (x: number, y: number) => {
    const adjacents = [
        {x: x - 1, y: y - 1}, {x: x, y: y - 1}, {x: x + 1, y: y - 1}, {x: x - 1, y: y}, 
        {x: x + 1, y: y}, {x: x - 1, y: y + 1}, {x: x, y: y + 1}, {x: x + 1, y: y + 1}
    ]

    return adjacents
        .map(adjacent => seats[adjacent.y]?.[adjacent.x])
        .filter(seat => seat === "#")
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
            if (seat === '#' && getOccupiedAdjacentSeats(x, y).length >= 4) {
                seatsCopy[y][x] = "L"
                hasChanged = true
            }
        })
    })

    seats = seatsCopy

    if (!hasChanged) break;
}

console.log("Part 1", seats.reduce((acc, state) => acc += state.filter(item => item === "#").length, 0))