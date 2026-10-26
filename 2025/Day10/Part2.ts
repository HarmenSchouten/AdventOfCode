const { init } = require('z3-solver')
const { readFileSync } = require('fs')

const main = async () => {
    const input = readFileSync("./Day10/input.txt", 'utf8')

    const machines = input
        .split("\r\n")
        .map(l => {
            const [_, buttonStr, reqStr] = l.match(/(\[.+])|(\(.+\))|(\{.+\})/g)
            const buttons = buttonStr.split(' ').map(x => x.match(/\d+/g)?.map(Number) ?? [])

            return {
                buttons: buttons,
                requirements: reqStr.match(/\d+/g)?.map(Number) ?? []
            }
        })

    const { Context } = await init();

    const run = async (machine) => {
        const ctx = new Context('main');
        const { Int, Optimize } = ctx;

        const opt = new Optimize();

        const pressVars = machine.buttons.map((_, i) => Int.const(`press_${i}`))

        pressVars.forEach(v => opt.add(v.ge(0)));

        for (let i = 0; i < machine.requirements.length; i++) {
            const contributions = []

            machine.buttons.forEach((indices, idx) => {
                const pressVar = pressVars[idx];
                const affects = indices.includes(i) ? 1 : 0
                contributions.push(pressVar.mul(affects))
            })

            opt.add(ctx.Sum(...contributions).eq(machine.requirements[i]))
        }

        const totalPresses = ctx.Sum(...pressVars);

        opt.minimize(totalPresses);

        const results = await opt.check();

        if (results === 'sat') {
            const model = opt.model();
            const presses = pressVars.map(v => Number(model.get(v).value()));
            return presses.reduce((acc, state) => { return acc + state }, 0);
        } else {
            console.log("No solution found");
        }
    }

    let answer = 0;
    for (const machine of machines) {
        const presses = await run(machine);
        answer += presses;
    }

    console.log(answer)
}

main();