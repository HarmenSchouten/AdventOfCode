import "../utils/index.ts"

const target = 29000000;
const max = 1000000;
const presents = new Array(max).fill(0);

for (let elf = 1; elf < max; elf++) {
    for (let house = elf; house < max; house += elf) {
        presents[house] += elf;
    }
}

for (let h = 1; h < max; h++) {
    if (presents[h] * 10 >= target) {
        console.log(h);
        break;
    }
}