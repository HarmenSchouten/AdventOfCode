import "../utils/index.ts"

const input = await Deno.readTextFile("Day01/input.txt");

const lines = input
    .splitLb()
    .reduce((acc, state) => {
        const isLeft = state.startsWith('L')
        const number = state.ints()[0];

        let zeros = 0
        let remaining = number;
        if (number >= 100)
        {
            zeros = Math.floor(number / 100)
            remaining -= zeros * 100
        }

        let newState = acc.curr + (isLeft ? -remaining : remaining);

        while (newState > 99)
        {
            newState -= 100;
            if (newState != 0 && acc.curr !== 0) zeros++
        }

        while (newState < 0)
        {
            newState += 100
            if (newState != 0 && acc.curr !== 0) zeros++
        }

        if (newState === 0) zeros++

        return {
            curr: newState,
            zero: acc.zero + zeros
        }
    }, { curr: 50, zero: 0 } as { curr: number, zero: number });

console.log(lines.zero)