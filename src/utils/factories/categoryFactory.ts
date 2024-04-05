import { CategoryApi } from '../../types/categories.types.';

export const generateCategories = (length: number) => {
    const result: CategoryApi[] = [];
    for (let i = 0; i < length; i++) {
        const newItem: CategoryApi = {
            id: i + 1,
            name: `Категория ${i + 1}`,
        };
        result.push(newItem);
    }
    return result;
};
