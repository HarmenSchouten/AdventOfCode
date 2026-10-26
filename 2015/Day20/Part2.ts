import "../utils/index.ts"

const target = 29000000;
const max = 1000000;
const maxElfDelivery = 50;
const presents = new Array(max).fill(0);

for (let elf = 1; elf < max; elf++) {
    let delivery = 0
    for (let house = elf; house < max && delivery < maxElfDelivery; house += elf, delivery++) {
        presents[house] += elf;
    }
}

for (let h = 1; h < max; h++) {
    if (presents[h] * 11 >= target) {
        console.log(h);
        break;
    }
}