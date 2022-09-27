import type {NextApiResponse} from 'next'
import {ApiRequest} from "../../types/types";
import {getUsers} from "../../lib/db";
import {createObjectCsvStringifier} from 'csv-writer';

export default function handler(req: ApiRequest, res: NextApiResponse<string>) {
    const {page, seed, errors, region} = req.query;
    const users = [];
    for(let i = 0; i <= page; i++) {
        users.push(...getUsers(i, seed, errors, region));
    }
    const csvWriter = createObjectCsvStringifier({header: [
            {id: 'id', title: 'ID'},
            {id: 'fullName', title: 'Full name'},
            {id: 'address', title: 'Address'},
            {id: 'phone', title: 'Phone'},
        ]});
    const csv = csvWriter.stringifyRecords(users);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-length', csv.length);
    res.send(csv);
}
