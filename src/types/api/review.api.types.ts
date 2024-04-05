import { HasID } from '../common.types';

export type CreateReviewRequest = {
    stars: number;
    description: string;
    user: number;
    excursion: number;
};
export type CreateReviewResponse = CreateReviewRequest & HasID;

export type ReviewsGetRequest = {
    excursion?: string;
    user?: string;
    stars?: string;
};
