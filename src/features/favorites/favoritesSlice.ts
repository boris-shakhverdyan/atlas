import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getFromStorage } from '../../utils/LocalStorageExplorer';
import { ExcursionProps } from '../../types/excursions.types';

export type FavoritesStateType = {
    items: ExcursionProps[];
};

const initialState: FavoritesStateType = {
    items: getFromStorage('favorites') || [],
};

export const FavoritesState = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<ExcursionProps>) => {
            state.items = [...state.items, action.payload];
        },
        remove: (state, action: PayloadAction<number>) => {
            const removeId = action.payload;
            state.items = state.items.filter((item) => item.id !== removeId);
        },
    },
});

export const { add, remove } = FavoritesState.actions;
export const favoritesReducer = FavoritesState.reducer;
