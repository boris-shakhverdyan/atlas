import { ExcursionApi } from '../../types/excursions.types';
import { getImgPath } from '../getAssetsPath';

export const generateExcursions = (length: number) => {
    const result: ExcursionApi[] = [];
    for (let i = 0; i < length; i++) {
        const newItem: ExcursionApi = {
            id: 0,
            country: 'Тестовая страна',
            city: {
                id: 2,
                name: 'Тестовый город',
            },
            duration: 4,
            title: `Тестовое название экскурсии ${i + 1}`,
            slogan: 'Тестовый слоган экскурсии',
            organizational_details: [
                {
                    id: 1,
                    text: 'Это тестовый организационный пункт.',
                    excursion: i + 1,
                },
                {
                    id: 2,
                    text: 'Это тестовый организационный пункт.',
                    excursion: i + 1,
                },
                {
                    id: 3,
                    text: 'Это тестовый организационный пункт.',
                    excursion: i + 1,
                },
            ],
            extra_details: [
                {
                    id: 1,
                    text: 'Это тестовый важный пункт.',
                    excursion: i + 1,
                },
                {
                    id: 2,
                    text: 'Это тестовый важный пункт.',
                    excursion: i + 1,
                },
                {
                    id: 3,
                    text: 'Это тестовый важный пункт.',
                    excursion: i + 1,
                },
            ],
            description:
                'Погрузитесь в историю древнего Рима, посещая памятники, такие как Колизей, Пантеон и Форум Римских императоров.',
            age_limit: 16,
            people_limit: 25,
            count_of_books: 20,
            ex_type: {
                id: 0,
                name: '',
                details: '',
            },
            payment_type: {
                id: 0,
                name: '',
            },
            price_variant: 'Per person',
            min_price: 150,
            tour_price: 120,
            main_photo: getImgPath('img.jpg'),
            cost: 100,
            discount: 15,
            status: true,
            transport: {
                id: 1,
                name: 'На автобусе',
            },
            guide: {
                first_name: '',
                last_name: '',
                phone: '',
                description: '',
                profile_photo: '',
                email: '',
            },
            languages: [1, 3],
            categories: [1, 13],
            rating: 4.8,
        };
        result.push(newItem);
    }
    return result;
};
