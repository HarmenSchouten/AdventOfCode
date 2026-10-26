import "../utils/index.ts"

const input = await Deno.readTextFile("Day01/input.txt");

const answer = input
    .splitLb()
    .reduce((acc, state) => {
        const isLeft = state.startsWith('L')
        const number = state.ints()[0];

        let newState = acc.curr + (isLeft ? -number : number)

        while (newState > 99) newState -= 100
        while (newState < 0) newState += 100

        if (newState === 0) acc.zero += 1
        acc.curr = newState

        return acc;
    }, { curr: 50, zero: 0 } as { curr: number, zero: number });

console.log(answer.zero)