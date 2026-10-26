// Scaffolds a day: deno task new <year> <day>
// Set AOC_SESSION to your adventofcode.com session cookie to download your input as well.
import { titleFor } from "./titles.ts"

const [year, day] = Deno.args
if (!year || !day) {
    console.error("Usage: deno task new <year> <day>")
    Deno.exit(1)
}

const folder = `${year}/Day${day.padStart(2, "0")}`
const dir = new URL(`../${folder}/`, import.meta.url)
await Deno.mkdir(dir, { recursive: true })

const exists = (name: string) => Deno.stat(new URL(name, dir)).then(() => true, () => false)

const template = `import "../../utils/index.ts"

const input = await Deno.readTextFile(new URL("./input.txt", import.meta.url))

// TODO: solve (deno task readme counts this part as unsolved while this line is here)
console.log(input.splitLb().length)
`
for (const name of ["Part1.ts", "Part2.ts"]) {
    if (await exists(name)) continue
    await Deno.writeTextFile(new URL(name, dir), template)
    console.log(`created ${folder}/${name}`)
}

if (!await exists("input.txt")) {
    const session = Deno.env.get("AOC_SESSION")
    let input = ""
    if (session) {
        const res = await fetch(`https://adventofcode.com/${year}/day/${+day}/input`, {
            headers: { Cookie: `session=${session}`, "User-Agent": "github.com/HarmenSchouten/AdventOfCode (deno task new)" },
        })
        // utils splits on \r\n, so match what a browser save on Windows produces
        if (res.ok) input = (await res.text()).trimEnd().replace(/\r?\n/g, "\r\n")
        else console.warn(`Couldn't download the input (HTTP ${res.status}); created an empty input.txt instead`)
    }
    await Deno.writeTextFile(new URL("input.txt", dir), input)
    console.log(`created ${folder}/input.txt${input ? "" : " (empty, paste your input in)"}`)
}

const title = await titleFor(+year, +day)
console.log(`\n${year} day ${+day}: ${title ?? "(title not available yet)"}`)
console.log(`Run it with: deno task solve ${year} ${+day}`)
