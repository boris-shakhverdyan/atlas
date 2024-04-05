import { HasID } from './common.types';
import { ExcursionDetailsApi } from './details.types';

export type ExcursionsFilterVariant =
    | 'cost'
    | '-cost'
    | 'count_of_books'
    | '-people_limit'
    | 'people_limit';
export type ExcursionApi = {
    id: number;
    country: string;
    city: {
        id: number;
        name: string;
    };
    duration: number;
    title: string;
    slogan: string;
    payment_type: {
        id: number;
        name: string;
    };
    organizational_details: ExcursionDetailsApi[];
    extra_details: ExcursionDetailsApi[];
    description: string;
    age_limit: number;
    people_limit: number;
    count_of_books: number;
    ex_type: {
        id: number;
        name: string;
        details: string;
    }; // Замените значениями, которые могут быть в поле 'ex_type'
    price_variant: 'Per person' | 'Per group'; // Замените значениями, которые могут быть в поле 'price_variant'
    min_price: number;
    tour_price: number;
    main_photo: string;
    cost: number;
    discount: number;
    status: boolean;
    transport: ExcursionTransport;
    guide: {
        first_name: string;
        last_name: string;
        profile_photo: string;
        phone: string;
        email: string;
        description: string;
    };
    languages: number[];
    categories: number[];
    rating: number;
};
export type ExcursionProps = Pick<
    ExcursionApi,
    | 'id'
    | 'main_photo'
    | 'title'
    | 'duration'
    | 'rating'
    | 'ex_type'
    | 'tour_price'
    | 'cost'
    | 'city'
    | 'transport'
    | 'description'
    | 'people_limit'
    | 'guide'
>;
export type ExcursionKind = {
    name: string;
} & HasID;

export type ExcursionTransport = {
    name: string;
} & HasID;

export type ExcursionsPayment = {
    id: number;
    name: string;
    min_price: number;
    per_person_price: number | null;
    discount: number;
};
