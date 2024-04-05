import { HasID } from './common.types';

export type ImageApi = {
    title: string;
    image: string;
    excursion: number;
} & HasID;
