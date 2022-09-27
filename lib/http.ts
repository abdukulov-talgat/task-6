import {SettingsType} from "./settingsContext";
import {User} from "../types/types";

type FetchConfig = SettingsType & {page: number};

export const fetchUsers = async ({page, errors, seed, region}: FetchConfig): Promise<User[]> => {
    const response = await fetch(
        `/api/users?page=${page}&errors=${errors}&seed=${seed}&region=${region}`
    );
    const json = await response.json();
    return JSON.parse(json) as User[];
}
