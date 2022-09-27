import {UserPartsDB, Gender, RegionValue, User} from "../types/types";
import {
    AddressAlgorithms,
    flipYesOrNo,
    PhoneNumberAlgorithms
} from "./utils";
import Chance from "chance";

export default class UsersGenerator {
    private readonly random: Chance.Chance;

    private readonly db: UserPartsDB;

    private readonly region: RegionValue;

    public constructor(seed: number, db: UserPartsDB, region: RegionValue) {
        this.random = new Chance(seed);
        this.db = db;
        this.region = region;
    }

    public generate = (count: number) => {
        const users: User[] = new Array(count).fill(null);
        return users.map(it => this.generateUser());
    }

    private generateUser = (): User => {
        return {
            id: this.generateId(),
            fullName: this.generateFullName(),
            address: this.generateAddress(),
            phone: this.generatePhone(),
        }
    }

    private generateId = () => {
        return this.random.integer({min: 0, max: Number.MAX_SAFE_INTEGER});
    }

    private generateFullName = () => {
        const gender: Gender = flipYesOrNo(this.random.integer({
            min: 0,
            max: 1
        })) ? 'male' : 'female';
        const name = this.random.pickone(this.db.names[gender]);
        const middlename = this.random.pickone(this.db.surnames[gender]);
        const surname = this.random.pickone(this.db.middlenames[gender]);
        return `${name} ${middlename} ${surname}`;
    }

    private generateAddress = () => {
        const country = flipYesOrNo(this.random.integer({
            min: 0,
            max: 1
        })) ? `${this.db.country} ` : '';
        const algorithm = this.random.pickone(AddressAlgorithms);
        return `${country}${algorithm(this.random, this.db, this.region)}`;
    }

    private generatePhone = () => {
        const algorithm = this.random.pickone(PhoneNumberAlgorithms[this.region]);
        return algorithm(this.random);
    }
}
