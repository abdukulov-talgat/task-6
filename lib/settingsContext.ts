import React from "react";
import {Regions, } from "./const";
import {RegionValue} from "../types/types";

export interface SettingsType {
    region: RegionValue,
    errors: number,
    seed: number,
}

type SetSettingsTypeFn = (value: SettingsType) => void;

type SettingsContextType = [SettingsType, SetSettingsTypeFn];

export const initialSettings: SettingsType = {
    region: Regions[0].value,
    errors: 0,
    seed: 0,
}

export const SettingsContext = React.createContext<SettingsContextType>([initialSettings, () => {
}]);
SettingsContext.displayName = 'Settings';

