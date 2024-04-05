import { ReviewApi } from '../../types/reviews.types';
import { getImgPath } from '../getAssetsPath';

export const generateReviews = (length: number) => {
    const result: ReviewApi[] = [];
    for (let i = 0; i < length; i++) {
        const newItem: ReviewApi = {
            id: i + 1,
            user: {
                first_name: `Имя`,
                last_name: `Фамилия ${i + 1}`,
                profile_photo: getImgPath('img.jpg'),
            },
            stars: 4.3,
            description:
                'Здесь должно находиться значение комментария пользователя, отозвавшегося на эту экскурсию',
            excursion: 1,
        };
        result.push(newItem);
    }
    return result;
};
