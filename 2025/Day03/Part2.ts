import "../utils/index.ts"
const input = await Deno.readTextFile("Day03/input.txt");

const targetLength = 12;
const answer = input
    .splitLb()
    .map(x => x.match(/\d/g)?.map(Number) ?? [])
    .reduce((acc, state) => {
        
        // Trim state to target length by removing the last occurence of the 
        // smallest digit before any larger digit until the target length is reached
        while (state.length > targetLength)
        {
            let minIdx = 0, minNum = 9;
            for (let i = 0; i < state.length; i++)
            {
                if (state[i] <= minNum)
                {
                    minNum = state[i];
                    minIdx = i;
                } else break
            }
            state.splice(minIdx, 1);
        }
        return acc + Number(state.join(''))
    }, 0)

console.log(answer)