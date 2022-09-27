import {RegionValue, UserPartsDB} from "../types/types";
import * as fs from "fs";
import path from "path";
import UsersGenerator from "./usersGenerator";
import Corrupter from "./corrupter";
import {LIMIT} from "./const";

export const getDataBase = (region: RegionValue): UserPartsDB => {
    const json = fs.readFileSync(path.resolve(`data/${region}.json`), {encoding: 'utf-8'});
    return JSON.parse(json);
}

export const getUsers = (page: number, seed: number, errors: number, region: RegionValue) => {
    const db = getDataBase(region);
    const generator = new UsersGenerator(seed + page, db, region);
    const users = generator.generate(Number(page) === 0 ? LIMIT * 2 : LIMIT);
    return  new Corrupter(seed + page, errors, db.symbols).corrupt(users);
}
