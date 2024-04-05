import { HasID } from '../../types/common.types';
import { ExcursionsFilterVariant } from '../../types/excursions.types';

export type FilterVariant = {
    name: string;
    type: ExcursionsFilterVariant;
} & HasID;

export const filterVariants: FilterVariant[] = [
    {
        id: 1,
        name: 'Дешевле',
        type: '-cost',
    },

    {
        id: 2,
        name: 'Дороже',
        type: 'cost',
    },
    {
        id: 3,
        name: 'Популярнее',
        type: 'count_of_books',
    },
];
