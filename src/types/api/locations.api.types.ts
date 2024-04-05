import { LocationApi } from '../locations.types';

export type LocationsGetRequest = {
    excursion: string;
};
export type LocationsCreateRequest = Omit<LocationApi, 'id'>[];
