import { useAppDispatch, useAppSelector } from '../app/hooks';
import { add, remove } from '../features/favorites/favoritesSlice';
import { ExcursionProps } from '../types/excursions.types';

type UseFavoritesHook = {
    isFavorite: boolean;
    addToFavorites: (excursion: ExcursionProps) => void;
    removeFavorite: (ex_id: number) => void;
};

const useFavorites = (ex_id: number): UseFavoritesHook => {
    const dispatch = useAppDispatch();
    const favoritesExcursions = useAppSelector((state) => state.favorites);
    const thisIsFavorite = favoritesExcursions.items.some((item) => item.id === ex_id);

    const addToFavorite = (excursion: ExcursionProps) => {
        dispatch(add(excursion));
    };
    const removeFavorite = (ex_id: number) => {
        dispatch(remove(ex_id));
    };

    return {
        isFavorite: thisIsFavorite,
        addToFavorites: addToFavorite,
        removeFavorite,
    };
};

export default useFavorites;
