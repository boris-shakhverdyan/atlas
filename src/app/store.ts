import { configureStore } from '@reduxjs/toolkit';
import { profileReducer } from '../features/profile/profileSlice';
import {excursionFormReducer} from "../features/excursion-form/excursionFormSlice";
import {modalsReducer} from "../features/modals/modalsSlice";
import {formsReducer} from "../features/forms/formsSlice";
import {mainReducer} from "../features/main/main";
import { searchReducer } from '../features/search/searchSlice';
import { favoritesReducer } from '../features/favorites/favoritesSlice';
import { mainDataReducer } from '../features/main-data/mainDataSlice';
import { excursionPageReducer } from '../features/excursion-page/excursionPageSlice';
import { guideReducer } from '../features/guide/guideSlice';
import { seenReducer } from '../features/seen/seenSlice';
import { cityPageReducer } from '../features/city-page/cityPageSlice';
import { editAvatarReducer } from '../features/edit-avatar/main';

export const store = configureStore({
    reducer: {
        profile: profileReducer,
        excursionForm: excursionFormReducer,
        modals: modalsReducer,
        forms: formsReducer,
        main: mainReducer,
        search: searchReducer,
        favorites: favoritesReducer,
        mainData: mainDataReducer,
        excursionPageData: excursionPageReducer,
        cityPageData: cityPageReducer,
        guide: guideReducer,
        seen: seenReducer,
        editAvatar: editAvatarReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
