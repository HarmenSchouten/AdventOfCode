import "../utils/index.ts"
const input = await Deno.readTextFile("./day15/input.txt")

const parsed = input.splitLb().map(x => x.match(/-?\d+/g)?.map(Number) ?? [])

const max = 100;
let winning = 0;
for (let i = 0; i < max; i++)
for (let j = 0; j < max; j++)
for (let k = 0; k < max; k++)
for (let l = 0; l < max; l++)
{
    if ((i + j + k + l) !== max) continue;
    const indices = [i, j, k, l]
    const result = parsed
        .map(([cap, dur, fla, tex, cal], z) => {
            const factor = indices[z]
            return [cap * factor, dur * factor, fla * factor, tex * factor, cal * factor]
        })
        .reduce((acc, [cap, dur, fla, tex, cal]) => {
            return {
                cap: acc.cap + cap,
                dur: acc.dur + dur,
                fla: acc.fla + fla,
                tex: acc.tex + tex,
                cal: acc.cal + cal
            }
        }, { cap: 0, dur: 0, fla: 0, tex: 0, cal: 0})

    if (result.cal !== 500) continue;

    const total = [result.cap, result.dur, result.fla, result.tex]
        .map(x => Math.max(0, x))
        .product()
    
    winning = Math.max(Math.max(0, total), winning)
}

console.log(winning)