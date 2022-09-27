import Chance from "chance";

export const errorAlgorithms = [
    (word: string, random: Chance.Chance, symbols: string) => {
        const index = random.integer({min: 0, max: word.length - 1});
        return word.slice(0, index) + random.pickone(symbols.split('')) + word.slice(index);
    },
    (word: string, random: Chance.Chance, _: string) => {
        const index = random.integer({min: 0, max: word.length - 1});
        return word.slice(0, index) + word.slice(index + 1);
    },
    (word: string, random: Chance.Chance, _: string) => {
        const index = random.integer({min: 0, max: word.length - 2});
        const temp = word[index];
        let result = word.split('');
        result[index] = result[index + 1];
        result[index + 1] = temp;
        return result.join('');
    },
]
