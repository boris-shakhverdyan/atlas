import { HasID } from './common.types';

export type ReviewApi = {
    user: {
        first_name: string;
        last_name: string;
        profile_photo: string | null;
    };
    stars: number;
    description: string;
    excursion: number;
} & HasID;
export type ReviewCardProps = ReviewApi;
