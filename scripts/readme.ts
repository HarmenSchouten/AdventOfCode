// Regenerates each year's README.md and the generated blocks in the root README.md from what's on disk.
import { loadTitles } from "./titles.ts"

const root = new URL("../", import.meta.url)
const titles = await loadTitles()

type Day = {
    day: number
    folder: string
    part1?: string
    part2?: string
    /** The last day's second star: awarded for having every other star of the year */
    gift?: boolean
    notes: string[]
    langs: Set<string>
}

const LANGS: Record<string, string> = { ts: "TypeScript", fsx: "F#", cs: "C#" }
const pad = (d: number) => String(d).padStart(2, "0")
const exists = (url: URL) => Deno.stat(url).then(() => true, () => false)
const list = (url: URL) => Array.fromAsync(Deno.readDir(url)).then(e => e.map(x => x.name).sort(), () => [] as string[])

// 2025 onwards the calendar is 12 days long
const daysIn = (year: number) => year >= 2025 ? 12 : 25

const scanYear = async (year: number) => {
    const days: Day[] = []
    for (let d = 1; d <= daysIn(year); d++) {
        const folder = `Day${pad(d)}`
        const dir = new URL(`${year}/${folder}/`, root)
        const all = await list(dir)
        // Untouched scaffolds from `deno task new` don't count as solved
        const stubs = new Set<string>()
        for (const n of all.filter(n => n.endsWith(".ts"))) {
            if ((await Deno.readTextFile(new URL(n, dir))).includes("// TODO: solve")) stubs.add(n)
        }
        const names = all.filter(n => !stubs.has(n))
        const has = (n: string) => names.includes(n)
        const entry: Day = { day: d, folder, notes: [], langs: new Set() }

        const combined = names.find(n => n === `Day${pad(d)}.ts`)
        entry.part1 = has("Part1.ts") ? "Part1.ts" : combined
        entry.part2 = has("Part2.ts") ? "Part2.ts" : combined
        if (combined) entry.notes.push(`Both parts in one file`)
        if (entry.part1 || entry.part2) entry.langs.add("ts")

        for (const [ext, lang] of [["fsx", "F#"], ["cs", "C#"]]) {
            const files = names.filter(n => n.endsWith(`.${ext}`))
            if (!files.length) continue
            entry.langs.add(ext)
            entry.notes.push(`Also in ${lang}: ${files.map(f => `[${f.replace(/\D/g, "") ? `part ${f.replace(/\D/g, "")}` : f}](${folder}/${f})`).join(", ")}`)
        }
        for (const part of ["Part1.ts", "Part2.ts"]) {
            if (!has(part)) continue
            const src = await Deno.readTextFile(new URL(`${year}/${folder}/${part}`, root))
            if (src.includes("require('z3-solver')")) entry.notes.push(`Part ${part[4]} uses the [z3](https://github.com/Z3Prover/z3) SMT solver and runs on Node`)
        }
        const helpers = names.filter(n => n.endsWith(".ts") && !/^Part[12]\.ts$/.test(n) && n !== combined)
        if (helpers.length) entry.notes.push(`Helpers: ${helpers.map(h => `[${h}](${folder}/${h})`).join(", ")}`)

        // The last day has a single puzzle; its second star is a gift for finishing the rest
        if (d === daysIn(year)) entry.part2 = undefined
        days.push(entry)
    }
    const last = days.at(-1)!
    last.gift = !!last.part1 && days.slice(0, -1).every(d => d.part1 && d.part2)
    return days
}

const isDone = (d: Day) => !!(d.part1 && (d.part2 || d.gift))
const stars = (days: Day[]) => days.reduce((n, d) => n + (d.part1 ? 1 : 0) + (d.part2 || d.gift ? 1 : 0), 0)
const totalStars = (year: number) => daysIn(year) * 2

// One glyph per day, grouped in fives like the weeks of a calendar
const strip = (days: Day[]) => days
    .map(d => isDone(d) ? "★" : d.part1 || d.part2 ? "☆" : "·")
    .join("")
    .replace(/(.{5})(?=.)/gu, "$1 ")

const years = (await list(root)).filter(n => /^20\d\d$/.test(n)).map(Number)
const summary: { year: number, solved: number, total: number, strip: string, langs: string[] }[] = []

for (const year of years) {
    const days = await scanYear(year)
    const solved = stars(days)
    const langs = [...new Set(days.flatMap(d => [...d.langs]))].sort((a, b) => Object.keys(LANGS).indexOf(a) - Object.keys(LANGS).indexOf(b)).map(l => LANGS[l])
    summary.push({ year, solved, total: totalStars(year), strip: strip(days), langs })

    const cell = (d: Day, file?: string) => file ? `[★](${d.folder}/${file})` : "·"
    const rows = days.map(d => {
        const title = titles[`${year}/${d.day}`]
        const puzzle = `[${title ?? `Day ${d.day}`}](https://adventofcode.com/${year}/day/${d.day})`
        const p2 = d.day === daysIn(year) ? (d.gift ? "★" : "·") : cell(d, d.part2)
        const notes = d.gift ? [...d.notes, "Second star earned by finishing every other puzzle"] : d.notes
        return `| ${d.day} | ${puzzle} | ${cell(d, d.part1)} | ${p2} | ${notes.join(" · ")} |`
    })

    const md = `# Advent of Code ${year}

[← All years](../README.md) · [Puzzles on adventofcode.com](https://adventofcode.com/${year}) · **${solved} / ${totalStars(year)}** stars

\`${strip(days)}\`

| Day | Puzzle | Part 1 | Part 2 | Notes |
|:-:|---|:-:|:-:|---|
${rows.join("\n")}

★ links to the solution · \`·\` not solved yet · day ${daysIn(year)} has a single puzzle; its second star is awarded once every other star is earned

Run a day from the repository root with \`deno task solve ${year} <day>\`.

<sub>Generated by \`deno task readme\`. Edit [scripts/readme.ts](../scripts/readme.ts), not this file.</sub>
`
    await Deno.writeTextFile(new URL(`${year}/README.md`, root), md)
}

// Root README: only the blocks between the generated markers are replaced
const solvedTotal = summary.reduce((n, s) => n + s.solved, 0)
const partsTotal = summary.reduce((n, s) => n + s.total, 0)
const badges = [
    `![Stars](https://img.shields.io/badge/stars-${solvedTotal}%2F${partsTotal}-ffff66?style=flat-square&labelColor=0f0f23)`,
    `![Years](https://img.shields.io/badge/years-${summary.length}-009900?style=flat-square&labelColor=0f0f23)`,
    `![Deno](https://img.shields.io/badge/Deno-2-ffffff?style=flat-square&logo=deno&labelColor=0f0f23)`,
    `![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=flat-square&logo=typescript&logoColor=white&labelColor=0f0f23)`,
].join("\n")
const progress = [
    "| Year | Calendar | Stars | Languages |",
    "|:-:|---|--:|---|",
    ...summary.toReversed().map(s => `| [**${s.year}**](${s.year}/README.md) | \`${s.strip}\` | ${s.solved} / ${s.total} | ${s.langs.join(", ")} |`),
    `| | | **${solvedTotal} / ${partsTotal}** | |`,
].join("\n")

const readmeUrl = new URL("README.md", root)
let readme = await Deno.readTextFile(readmeUrl)
const fill = (name: string, content: string) => {
    const re = new RegExp(`(<!-- generated:${name} -->)[\\s\\S]*?(<!-- /generated:${name} -->)`)
    if (!re.test(readme)) throw new Error(`README.md is missing the <!-- generated:${name} --> markers`)
    readme = readme.replace(re, `$1\n${content}\n$2`)
}
fill("badges", badges)
fill("progress", progress)
await Deno.writeTextFile(readmeUrl, readme)

console.log(`Updated ${summary.length} year READMEs and the root README (${solvedTotal} / ${partsTotal} stars)`)
