import type {NextApiResponse} from 'next'
import {ApiRequest} from '../../types/types'
import { getUsers} from "../../lib/db";

export default function handler(req: ApiRequest, res: NextApiResponse<string>) {
    debugger;
    const {page, seed, errors, region} = req.query;
    const users = getUsers(page, seed, errors, region);
    res.status(200).json(JSON.stringify(users));
}
