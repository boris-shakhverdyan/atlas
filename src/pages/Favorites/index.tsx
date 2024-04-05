import ExcursionsLayout from '../../layouts/ExcursionsLayout';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { remove } from '../../features/favorites/favoritesSlice';

const Favorites = () => {
    const dispatch = useAppDispatch();
    const favoritesExcursions = useAppSelector((state) => state.favorites.items);

    const deleteFromFavorites = (item: number) => {
        dispatch(remove(item));
    };

    return (
        <div className="wrapper">
            <ExcursionsLayout
                emptyText={'Пока пусто.'}
                onDelete={deleteFromFavorites}
                sectionTitle={'Избранные экскурсии'}
                countText={'Добавлено'}
                excursions={favoritesExcursions}
                backLinkText={'На главную'}
            />
        </div>
    );
};

export default Favorites;
