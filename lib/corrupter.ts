import {User} from "../types/types";
import Chance from 'chance';
import {errorAlgorithms} from "./errorAlgorithms";

const fieldsForCorrupt = [
    'fullName',
    'address',
    'phone',
] as const;

export default class Corrupter {
    private readonly random: Chance.Chance;

    private readonly errors: number;

    private readonly symbols: string;

    constructor(seed: number, errors: number, symbols: string) {
        this.random = new Chance(seed);
        this.errors = errors;
        this.symbols = symbols;
    }

    public corrupt = (users: User[]) => {
        return users.map((it) => this.corruptUser(it));
    }

    private corruptUser = (user: User) => {
        const errorsQueue = this.getErrorsQueue();
        errorsQueue.forEach((it) => {
            user[it.field] = it.algorithm(user[it.field], this.random, this.symbols);
        });
        return user;
    }

    private getErrorsQueue = () => {
        const count = this.calcErrorsCount();
        const queue = [];
        while (queue.length < count) {
            const algorithms = this.random.shuffle(errorAlgorithms.slice());
            const field = this.random.pickone<typeof fieldsForCorrupt[number]>(fieldsForCorrupt.slice());
            queue.push(...algorithms.map((algorithm) => ({field, algorithm})));
        }

        return queue.slice(0, count);
    }

    private calcErrorsCount = () => {
        let count = Math.trunc(this.errors);
        let decimal = this.errors - count;
        if (Math.trunc(decimal * 100) >= this.random.d100()) {
            count++;
        }
        return count;
    }
}

