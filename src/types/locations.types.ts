import { HasID } from './common.types';

export type LocationApi = {
    name: string;
    excursion: number;
    duration: number;
    location: string;
    description: string;
} & HasID;
