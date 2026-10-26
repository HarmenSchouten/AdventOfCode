import "../utils/index.ts"
const input = await Deno.readTextFile("./day22/input.txt")

type Boss = {
    hitpoints: number
    damage: number
}

type Player = {
    hitpoints: number,
    mana: number,
    manaSpent: number
    armor: 0
    effects: Effect[]
    actions: string[]
}

type Effect = {
    id: string
    cost: number,
    duration: number,
}

const boss = input.splitLb().reduce((acc, state, i) => {
    if (i === 0) acc.hitpoints = state.ints()[0]
    if (i === 1) acc.damage = state.ints()[0]
    return acc;
}, { hitpoints: 0, damage: 0 } as Boss)

const options = [
    {
        id: "magic-missile",
        cost: 53,
        duration: 0,
    },
    {
        id: "drain",
        cost: 73,
        duration: 0,
    },
    {
        id: "shield",
        cost: 113,
        duration: 6,
    },
    {
        id: "poison",
        cost: 173,
        duration: 6,
    },
    {
        id: "recharge",
        cost: 229,
        duration: 5,
    },
] as Effect[]

let queue = [{
    boss: boss,
    player: {
        hitpoints: 50,
        mana: 500,
        manaSpent: 0,
        armor: 0,
        effects: [],
        actions: []
    }
}] as { boss: Boss, player: Player }[]
let i = 0;

let least = Number.MAX_SAFE_INTEGER;

const onEffectStart = (effect: string, player: Player, boss: Boss) => {
    if (effect === "magic-missile") {
        boss.hitpoints -= 4
    } else if (effect === "drain") {
        boss.hitpoints -= 2
        player.hitpoints += 2
    } else if (effect === "shield") {
        player.armor += 7
    }
}

const onEffect = (effect: string, player: Player, boss: Boss) => {
    if (effect === "poison") {
        boss.hitpoints -= 3
    } else if (effect === "recharge") {
        player.mana += 101
    }
}

const onEffectEnd = (effect: string, player: Player, _boss: Boss) => {
    if (effect === "shield") {
        player.armor -= 7
    }
}

while (least === Number.MAX_SAFE_INTEGER && queue.length > 0) {
    const newQueue = [] as { boss: Boss, player: Player }[]

    while (queue.length) {
        const { boss, player } = queue.shift()!

        const playerTurn = i % 2 === 0;
        const playerText = playerTurn ? "Player" : "Boss"

        player.actions.push(`${playerText} turn; Boss HP: ${boss.hitpoints}, Player HP: ${player.hitpoints}, Player Mana: ${player.mana}`)

        if (playerTurn) {
            // Hard mode: player loses 1 HP at start of turn
            player.hitpoints -= 1
            player.actions.push(`${i}: Hard mode damage. Player HP: ${player.hitpoints}`)
            if (player.hitpoints <= 0) {
                continue;
            }
        }

        // Apply effects
        player.effects = player.effects.reduce((acc, effect) => {
            onEffect(effect.id, player, boss)
            if (effect.duration === 1) {
                onEffectEnd(effect.id, player, boss)
                player.actions.push(`${i}: Effect ${effect.id} ended. Boss HP: ${boss.hitpoints}, Player HP: ${player.hitpoints}`)
            } else {
                acc.push({ ...effect, duration: effect.duration - 1 })
            }
            return acc;
        }, [] as Effect[])

        if (boss.hitpoints <= 0) {
            least = Math.min(least, player.manaSpent)
            continue;
        }

        if (playerTurn) {
            const eligibleOptions = options.filter(x => x.cost <= player.mana && !player.effects.some(e => e.id === x.id))
            if (eligibleOptions.length === 0) continue;
            for (const option of eligibleOptions) {
                const newBoss = { ...boss }
                const newPlayer = {
                    hitpoints: player.hitpoints,
                    mana: player.mana - option.cost,
                    manaSpent: player.manaSpent + option.cost,
                    armor: player.armor,
                    effects: player.effects.slice(),
                    actions: [...player.actions, `${i}: Player casts ${option.id}`]
                }
                if (option.duration > 0) newPlayer.effects.push(option)
                onEffectStart(option.id, newPlayer, newBoss)
                newPlayer.actions.push(`${i}: Effect ${option.id} started: Boss HP: ${newBoss.hitpoints}, Player HP: ${newPlayer.hitpoints}`)

                if (newBoss.hitpoints <= 0) {
                    least = Math.min(least, newPlayer.manaSpent)
                    continue;
                }

                newQueue.push({ boss: newBoss, player: newPlayer })
            }
        } else {
            player.hitpoints -= Math.max(1, boss.damage - player.armor)
            player.actions.push(`${i}: Boss attacks for ${Math.max(1, boss.damage - player.armor)} damage. Player HP: ${player.hitpoints}`)

            if (player.hitpoints <= 0) {
                continue;
            }

            newQueue.push({ boss, player })
        }
    }

    queue = newQueue
    i++
}

console.log("Least mana spent:", least)