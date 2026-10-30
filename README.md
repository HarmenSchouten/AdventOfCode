<div align="center">

# Advent of Code

My solutions to [Advent of Code](https://adventofcode.com), Eric Wastl's yearly advent calendar of programming puzzles.<br>
Mostly TypeScript on Deno, with detours into F#, C# and an SMT solver.

<!-- generated:badges -->
![Stars](https://img.shields.io/badge/stars-300%2F374-ffff66?style=flat-square&labelColor=0f0f23)
![Years](https://img.shields.io/badge/years-8-009900?style=flat-square&labelColor=0f0f23)
![Deno](https://img.shields.io/badge/Deno-2-ffffff?style=flat-square&logo=deno&labelColor=0f0f23)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=flat-square&logo=typescript&logoColor=white&labelColor=0f0f23)
<!-- /generated:badges -->

</div>

## Progress

<!-- generated:progress -->
| Year | Calendar | Stars | Languages |
|:-:|---|--:|---|
| [**2025**](2025/README.md) | `★★★★★ ★★★★★ ★★` | 24 / 24 | TypeScript |
| [**2024**](2024/README.md) | `★★★★★ ★★★★★ ★★★★★ ★★★★★ ★★★★★` | 50 / 50 | TypeScript |
| [**2023**](2023/README.md) | `★★★★★ ★★★★★ ★★★★★ ★★★★★ ★★★★★` | 50 / 50 | TypeScript, C# |
| [**2022**](2022/README.md) | `★★★★★ ★★★★★ ★★★★★ ★★★★★ ★★★★★` | 50 / 50 | TypeScript, F# |
| [**2021**](2021/README.md) | `★★★★★ ★★★★★ ★★★★★ ★★☆·· ·····` | 35 / 50 | TypeScript |
| [**2020**](2020/README.md) | `★★★★★ ★★★★★ ★★★★★ ★★★☆· ·····` | 37 / 50 | TypeScript |
| [**2016**](2016/README.md) | `★★··· ····· ····· ····· ·····` | 4 / 50 | TypeScript |
| [**2015**](2015/README.md) | `★★★★★ ★★★★★ ★★★★★ ★★★★★ ★★★★★` | 50 / 50 | TypeScript |
| | | **300 / 374** | |
<!-- /generated:progress -->

<sub>One glyph per day, in weeks of five: ★ both parts · ☆ one part · `·` not solved yet. A star means there's a solution file for it here; the last day's second star is awarded once every other star of the year is earned. Click a year for the full list of puzzles.</sub>

## Running a solution

Bring your own puzzle input: save it as `input.txt` next to the solution, for example `2015/Day24/input.txt`. Then, from the repository root:

```sh
deno task solve 2015 24      # both parts, timed
deno task solve 2015 24 2    # part 2 only
```

Every solution reads the `input.txt` in its own folder, so you can also run a single file directly from any directory:

```sh
deno run --allow-read 2015/Day24/Part1.ts
```

> [!NOTE]
> The input parsing helpers split on Windows line endings (`\r\n`), which is what saving an input from the browser on Windows produces. An input with plain `\n` line endings needs converting first. `deno task new` does this for you when it downloads an input.

A few solutions run outside Deno:

| Solution | Run with |
|---|---|
| F# versions of 2022 days 1 and 6 | `dotnet fsi 2022/Day01/Part1.fsx` |
| C# version of 2023 day 1 | `dotnet run 2023/Day01/Part1.cs` (.NET 10 or later) |
| 2023 day 24 and 2025 day 10, part 2 ([z3](https://github.com/Z3Prover/z3)) | `npm ci` once, then `deno task solve 2023 24 2` picks Node automatically |

## Starting a new day

```sh
deno task new 2026 1
```

This creates `2026/Day01/` with `Part1.ts`, `Part2.ts` and `input.txt`, and prints the puzzle title. Set `AOC_SESSION` to your adventofcode.com session cookie and it downloads your input as well. After solving, `deno task readme` updates every progress table.

## Shared utilities

Every TypeScript solution starts with the same import, which adds a handful of helpers to built-in types:

```ts
import "../../utils/index.ts"

const input = await Deno.readTextFile(new URL("./input.txt", import.meta.url))
const numbers = input.ints()           // every number in the input
const total = numbers.sum()
```

| On | Helper | What it does |
|---|---|---|
| `String` | `ints()` | All unsigned integers in the string |
| | `splitLb()` / `splitDlb()` | Split on line breaks / blank lines |
| | `isDigit()` | Whether the whole string is digits |
| | `toGrid(mapper?)` | Parse into a flat list of cells that know their neighbours |
| `Array` | `sum()` / `product()` | Sum or product of a number array |
| | `chunk(size)` | Split into chunks of `size` |
| | `lcm()` | Least common multiple of all elements |
| `utils/common.ts` | `gcd`, `lcm`, `memoize` | Number theory and caching |
| | `manhattan`, `euclidean` | Distances between points |
| | `shoelace`, `picksTheoremInnerBoundaries` | Polygon area and interior points |
| `utils/grid2d.ts` | `Grid2D` | 2D grid with lookups by row and column, `transposeLeft/Right` and `flipHorizontal/Vertical` |
| `utils/grid.ts` | `Grid` | Older grid built on a flat cell list, used by 2023 |

## Layout

```
.
├── 2015/ … 2025/       one folder per year, each with its own README
│   └── Day01/
│       ├── Part1.ts
│       ├── Part2.ts
│       └── input.txt   your puzzle input (gitignored)
├── utils/              helpers shared by every year
├── scripts/            the solve, new and readme tasks
└── deno.json
```