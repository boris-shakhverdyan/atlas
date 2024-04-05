import { OrderApi } from '../order.types';

export type OrderByIdRequest = {
    id: number;
};
export type CreateOrderRequest = Pick<
    OrderApi,
    'excursion' | 'cnt_of_people' | 'travel_date' | 'email' | 'full_name' | 'phone'
>;
