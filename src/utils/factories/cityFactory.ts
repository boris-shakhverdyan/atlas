import { CityApi } from '../../types/cities.types';
import { getImgPath } from '../getAssetsPath';

export const generateCities = (length: number) => {
    const result: CityApi[] = [];
    for (let i = 0; i < length; i++) {
        const newItem: CityApi = {
            id: i + 1,
            main_photo: getImgPath('city.jpg'),
            img_avatar: '',
            img_card: '',
            city_min_price: 1000,
            name: `Город ${i + 1}`,
            num_excursions: 18,
            country: 3,
        };
        result.push(newItem);
    }
    return result;
};
