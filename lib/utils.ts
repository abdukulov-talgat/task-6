import {RegionValue, UserPartsDB} from "../types/types";
import {
    MapRegionToText,
    MAX_APARTMENT_NUMBER,
    MAX_BUILDING_NUMBER, RuPhonePrefixes
} from "./const";
import Chance from 'chance';

export const getRandomInt = (min: number, max: number): number => {
    min = Math.abs(min);
    max = Math.abs(max);
    if (min > max) {
        [max, min] = [min, max]
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const flipYesOrNo = (num: number): boolean => {
    return num === 1;
}

export const clampNumber = (num: number, min: number, max: number): number => {
    return Math.min(max, Math.max(num, min));
}

export const AddressAlgorithms = [
    (random: Chance.Chance, db: UserPartsDB, region: RegionValue) => {
        const addressParts: string[] = [];
        addressParts.push(random.pickone(db.cities));
        addressParts.push(random.pickone(db.streets));
        addressParts.push(`${MapRegionToText[region].building} ${random.integer({
            min: 1,
            max: MAX_BUILDING_NUMBER
        })}`)
        addressParts.push(`${MapRegionToText[region].apartment} ${random.integer({
            min: 1,
            max: MAX_APARTMENT_NUMBER
        })}`)
        return flipYesOrNo(random.integer({
            min: 0,
            max: 1
        })) ? addressParts.join(' ') : addressParts.reverse().join(' ')
    },
    (random: Chance.Chance, db: UserPartsDB, region: RegionValue) => {
        const addressParts: string[] = [];
        addressParts.push(random.pickone(db.counties));
        addressParts.push(random.pickone(db.streets));
        addressParts.push(`${MapRegionToText[region].house} ${random.integer({
            min: 1,
            max: MAX_BUILDING_NUMBER
        })}`)
        return flipYesOrNo(random.integer({
            min: 0,
            max: 1
        })) ? addressParts.join(' ') : addressParts.reverse().join(' ')
    }
];

export const PhoneNumberAlgorithms = {
    ['en-GB']: [
        (random: Chance.Chance) => {
            return `+44${random.integer({
                min: 1_000_000_000,
                max: 9_999_999_999
            })}`
        },
        (random: Chance.Chance) => {
            return `0${random.integer({
                min: 1_000_000_000,
                max: 9_999_999_999
            })}`
        },
    ],
    ['ru-RU']: [
        (random: Chance.Chance) => {
            return `+7${random.pickone(RuPhonePrefixes)}${random.integer({
                min: 1_000_000,
                max: 9_999_999
            })}`
        },
        (random: Chance.Chance) => {
            return `8${random.pickone(RuPhonePrefixes)}${random.integer({
                min: 1_000_000,
                max: 9_999_999
            })}`
        },
    ],
    ['pl-PL']: [
        (random: Chance.Chance) => {
            return `+48${random.integer({
                min: 100_000_000,
                max: 999_999_999
            })}`
        },
        (random: Chance.Chance) => {
            return `${random.integer({
                min: 100_000_000,
                max: 999_999_999
            })}`
        },
    ]
}

