export const MAX_ERRORS = 1000;

export const MIN_ERRORS = 0;

export const Regions = [
    {value: 'en-GB', text: 'English - United Kingdom'},
    {value: 'ru-RU', text: 'Russian - Russia'},
    {value: 'pl-PL', text: 'Polish - Poland'}
] as const;

export const MapRegionToText = {
    ['en-GB']: { building: 'building', apartment: 'apartment', house: 'house'},
    ['ru-RU']: { building: 'дом', apartment: 'квартира', house: 'дом'},
    ['pl-PL']: { building: 'budynek', apartment: 'mieszkanie', house: 'dom'},
}

export const RuPhonePrefixes = [401, 471, 472, 473, 474, 475, 495, 499, 492];

export const LIMIT = 10;

export const MAX_APARTMENT_NUMBER = 999;

export const MAX_BUILDING_NUMBER = 999;

export const DEBOUNCE_TIMEOUT = 500;
