import {Regions} from "../lib/const";
import {NextApiRequest} from "next";

export type RegionValue = typeof Regions[number]['value'];

export interface User {
    id: number,
    fullName: string,
    address: string,
    phone: string
}

export interface MaleFemaleSeparator {
    male: string[]
    female: string[]
}

export interface UserPartsDB {
    country: string,
    symbols: string,
    names: MaleFemaleSeparator,
    surnames: MaleFemaleSeparator,
    middlenames: MaleFemaleSeparator,
    cities: string[],
    counties: string[],
    streets: string[]
}

export type Gender = 'male' | 'female';

export type ApiRequest = NextApiRequest & {
    query: {
        page: number,
        seed: number,
        errors: number
        region: RegionValue,
    }
}
