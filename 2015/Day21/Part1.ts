import "../utils/index.ts"
const input = await Deno.readTextFile("./day21/input.txt")

type Player = {
    hitpoints: number
    damage: number
    armor: number
}

type Item = {
    cost: number
    damage: number
    armor: number
}

const [bossSection, ...goodsSection] = input.splitDlb()

const parseBoss = (section: string): Player =>
    section.splitLb().reduce((acc, state, i) => {
        const value = state.ints()[0]
        if (i === 0) acc.hitpoints = value
        if (i === 1) acc.damage = value
        if (i === 2) acc.armor = value
        return acc
    }, { hitpoints: 0, damage: 0, armor: 0 })

const parseGoods = (sections: string[]): Item[][] =>
    sections.reduce((acc, state, i, self) => {
        const items = state.splitLb().slice(1).map((x) => {
            if (i === self.length - 1) {
                const [_, cost, damage, armor] = x.ints()
                return { cost, damage, armor }
            } else {
                const [cost, damage, armor] = x.ints()
                return { cost, damage, armor }
            }
        })
        if (i === self.length - 1) {
            acc.push(items.slice(0, 3))
            acc.push(items.slice(3))
        } else acc.push(items)
        return acc
    }, [] as Item[][])

const simulateCombat = (player: Player, boss: Player): boolean => {
    let turnCount = 0
    const playerCopy = { ...player }
    const bossCopy = { ...boss }

    while (true) {
        if (turnCount % 2 === 0) {
            bossCopy.hitpoints -= Math.max(1, playerCopy.damage - bossCopy.armor)
            if (bossCopy.hitpoints <= 0) break
        } else {
            playerCopy.hitpoints -= Math.max(1, bossCopy.damage - playerCopy.armor)
            if (playerCopy.hitpoints <= 0) break
        }
        turnCount++
    }

    return playerCopy.hitpoints > 0
}

const createPlayer = (items: Item[]): Player =>
    items.reduce(
        (acc, item) => ({
            hitpoints: acc.hitpoints,
            damage: acc.damage + item.damage,
            armor: acc.armor + item.armor
        }),
        { hitpoints: 100, damage: 0, armor: 0 }
    )

const calculateCost = (items: Item[]): number =>
    items.reduce((acc, item) => acc + item.cost, 0)

const generateCombinations = (itemGroups: Item[][]): Item[][] => {
    const [first, ...rest] = itemGroups
    return rest.reduce<Item[][]>(
        (acc, curr) =>
            acc.flatMap(base => [
                base,
                ...curr.map(item => [...base, item]),
            ]),
        first.map(item => [item])
    )
}

const boss = parseBoss(bossSection)
const goods = parseGoods(goodsSection)
const combinations = generateCombinations(goods)

const evaluateStrategy = (combo: Item[], boss: Player) => {
    const player = createPlayer(combo)
    const cost = calculateCost(combo)
    const wins = simulateCombat(player, boss)
    return { combo, cost, wins, player }
}

const results = combinations.map(combo => evaluateStrategy(combo, boss))
const winningResults = results.filter(r => r.wins)

const least = Math.min(...winningResults.map(r => r.cost))

console.log(least)