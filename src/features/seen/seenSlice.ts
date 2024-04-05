import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getFromStorage } from '../../utils/LocalStorageExplorer';
import { ExcursionProps } from '../../types/excursions.types';

export type SeenStateType = {
    items: ExcursionProps[];
};

const initialState: SeenStateType = {
    items: getFromStorage('seen') || [],
};

export const SeenState = createSlice({
    name: 'seen',
    initialState,
    reducers: {
        addToSeen: (state, action: PayloadAction<ExcursionProps>) => {
            state.items = [...state.items, { ...action.payload }];
        },
        clearSeen: (state) => {
            state.items = [];
        },
    },
});

export const { addToSeen, clearSeen } = SeenState.actions;
export const seenReducer = SeenState.reducer;
