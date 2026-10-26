// Runs one day's solutions and times them: deno task solve <year> <day> [part]
import { fileURLToPath } from "node:url"

const [year, day, part] = Deno.args
if (!year || !day) {
    console.error("Usage: deno task solve <year> <day> [part]")
    Deno.exit(1)
}

const dir = new URL(`../${year}/Day${day.padStart(2, "0")}/`, import.meta.url)
const names = await Array.fromAsync(Deno.readDir(dir)).then(entries => entries.map(e => e.name)).catch(() => [])

// Most days have Part1.ts/Part2.ts; a few early ones solve both parts in a single DayNN.ts
const parts = names.filter(n => /^Part[12]\.ts$/.test(n)).sort()
const solutions = part ? parts.filter(n => n === `Part${part}.ts`)
    : parts.length ? parts
    : names.filter(n => /^Day\d+\.ts$/.test(n))

if (!solutions.length) {
    console.error(`No TypeScript solution found in ${year}/Day${day.padStart(2, "0")}${part ? ` for part ${part}` : ""}`)
    Deno.exit(1)
}

const hasInput = await Deno.stat(new URL("input.txt", dir)).then(() => true, () => false)

for (const name of solutions) {
    const file = fileURLToPath(new URL(name, dir))
    const src = await Deno.readTextFile(file)
    // A few puzzles have their input inline in the code, so only insist on input.txt when it's read
    if (!hasInput && src.includes("input.txt")) {
        console.error(`No input.txt in ${year}/Day${day.padStart(2, "0")}. Save your puzzle input from https://adventofcode.com/${year}/day/${+day}/input there.`)
        Deno.exit(1)
    }
    // The z3 solutions only work under Node (see the note at the top of those files)
    const viaNode = src.includes("require('z3-solver')")
    const [cmd, ...args] = viaNode ? ["node", file] : ["deno", "run", "-A", file]

    console.log(`\x1b[2m── ${year} · Day ${day.padStart(2, "0")} · ${name.replace(".ts", "")}${viaNode ? " (node)" : ""} ──\x1b[0m`)
    const start = performance.now()
    const { code } = await new Deno.Command(cmd, { args, stdout: "inherit", stderr: "inherit" }).output()
    const ms = performance.now() - start
    console.log(`\x1b[2m${ms < 1000 ? `${ms.toFixed(0)} ms` : `${(ms / 1000).toFixed(2)} s`}${code ? ` · exit ${code}` : ""}\x1b[0m\n`)
}
