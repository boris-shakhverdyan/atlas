import { ExcursionDetailsApi } from '../details.types';

export type DetailsGetRequest = {
    excursion?: string;
};

export type DetailsCreateRequest = Omit<ExcursionDetailsApi, 'id'>[];
