import { HasID } from './common.types';

export type CityApi = {
    name: string;
    main_photo: string | null;
    img_avatar: string | null;
    img_card: string | null;
    country: number;
    num_excursions: number;
    city_min_price: number;
} & HasID;
export type CityCardProps = CityApi;
