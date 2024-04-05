import { HasID } from './common.types';
import { ProfileData } from './user.types';

export type OrderApi = {
    user: Pick<ProfileData, 'first_name' | 'email' | 'last_name' | 'phone' | 'profile_photo'>;
    cnt_of_people: number;
    status: string;
    order_date: string;
    travel_date: string;
    tour_price: number | null;
    email: string | null;
    phone: string | null;
    full_name: string | null;
    excursion: number;
} & HasID;
