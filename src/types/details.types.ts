import { HasID } from './common.types';

export type ExcursionDetailsApi = {
    text: string;
    excursion: number;
} & HasID;
