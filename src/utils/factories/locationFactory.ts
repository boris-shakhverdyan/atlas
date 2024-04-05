import { LocationApi } from '../../types/locations.types';

export const generateCategories = (length: number) => {
    const result: LocationApi[] = [];
    for (let i = 0; i < length; i++) {
        const newItem: LocationApi = {
            id: i + 1,
            name: `Локация ${i + 1}`,
            description: `Описание локации`,
            location: `Локация`,
            duration: 1,
            excursion: 1,
        };
        result.push(newItem);
    }
    return result;
};
