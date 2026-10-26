// Puzzle titles, cached in titles.json so the README generator never needs the network.
const cacheFile = new URL("./titles.json", import.meta.url)

const ENTITIES: Record<string, string> = { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">" }
const decode = (html?: string) => html
    ?.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .replace(/&(\w+);/g, (m, name) => ENTITIES[name] ?? m)

export const loadTitles = async (): Promise<Record<string, string>> =>
    JSON.parse(await Deno.readTextFile(cacheFile).catch(() => "{}"))

/** Returns the cached title, fetching (and caching) it from adventofcode.com when missing */
export const titleFor = async (year: number, day: number) => {
    const titles = await loadTitles()
    const key = `${year}/${day}`
    if (titles[key]) return titles[key]

    const res = await fetch(`https://adventofcode.com/${year}/day/${day}`, {
        headers: { "User-Agent": "github.com/HarmenSchouten/AdventOfCode (title cache)" },
    }).catch(() => undefined)
    const title = decode((await res?.text())?.match(/<h2>--- Day \d+: (.*?) ---<\/h2>/)?.[1])
    if (!title) return undefined

    titles[key] = title
    const sorted = Object.fromEntries(Object.entries(titles).sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true })))
    await Deno.writeTextFile(cacheFile, JSON.stringify(sorted, null, 2) + "\n")
    return title
}
