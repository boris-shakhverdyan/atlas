import { OrderApi } from '../../types/order.types';

export const generateOrders = (length: number) => {
    const result: OrderApi[] = [];
    for (let i = 0; i < length; i++) {
        const newItem: OrderApi = {
            id: i + 1,
            travel_date: '2023-12-22',
            email: '',
            excursion: 1,
            tour_price: 1000,
            user: {
                email: '',
                last_name: '',
                first_name: '',
                phone: '4343',
                profile_photo: '',
            },
            phone: '',
            order_date: '2023-12-15T06:10:09Z',
            full_name: '',
            cnt_of_people: 1,
            status: 'payed',
        };
        result.push(newItem);
    }
    return result;
};
