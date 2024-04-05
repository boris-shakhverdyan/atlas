import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExcursionApi } from '../../types/excursions.types';
import { CategoryApi } from '../../types/categories.types.';
import { ExcursionServiceApi } from '../../http/api/excursion.api';
import { ExcursionsGetRequest } from '../../types/api/excursion.api.types';
import { CategoryServiceApi } from '../../http/api/categories.api';
import { CityServiceApi } from '../../http/api/cities.api';
import { CityApi } from '../../types/cities.types';

export interface SearchState {
    val: string;
    category: number;
    city: number;
    loadings: {
        excursions: boolean;
        categories: boolean;
        cities: boolean;
    };
    filterVariant: number;
    allCities: Array<CityApi>;
    categoriesResults: Array<CategoryApi>;
    results: Array<ExcursionApi>;
}

const initialState: SearchState = {
    val: '',
    loadings: {
        excursions: false,
        categories: false,
        cities: false,
    },
    filterVariant: 3,
    city: 0,
    category: 0,
    allCities: [],
    categoriesResults: [],
    results: [],
};

export const getSearchedExcursions = createAsyncThunk(
    'search/excursions/get',
    async (request: ExcursionsGetRequest, { dispatch }) => {
        const params: ExcursionsGetRequest = {
            ordering: request.ordering,
            search: request.search,
            categories: request.categories ? String(request.categories[0]) : undefined,
            city: request.city ? String(request.city) : undefined,
        };
        const res = await ExcursionServiceApi.Get(params);
        return res.data;
    },
);
export const getAllCategories = createAsyncThunk(
    'search/categories/get',
    async (_, { dispatch }) => {
        const res = await CategoryServiceApi.Get({});
        return res.data;
    },
);
export const getAllCities = createAsyncThunk('search/cities/get', async (_, { dispatch }) => {
    const res = await CityServiceApi.Get({});
    return res.data;
});

export const SearchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearch(state, action: PayloadAction<string>) {
            state.val = action.payload;
        },
        resetSearch(state) {
            state.val = '';
            state.filterVariant = 1;
            state.category = 0;
            state.city = 0;
        },
        setSearchFilter(state, action: PayloadAction<number>) {
            state.filterVariant = action.payload;
        },
        setSearchCity(state, action: PayloadAction<number>) {
            state.city = action.payload;
        },
        setCategory(state, action: PayloadAction<number>) {
            state.category = action.payload;
        },
        setCity(state, action: PayloadAction<number>) {
            state.city = action.payload;
        },
    },
    extraReducers: (builder) => {
        // CATEGORIES
        builder.addCase(getAllCategories.fulfilled, (state, action) => {
            state.categoriesResults = action.payload;
            state.loadings.categories = false;
        });
        builder.addCase(getAllCategories.pending, (state, action) => {
            state.loadings.categories = true;
        });
        builder.addCase(getAllCategories.rejected, (state, action) => {
            state.loadings.categories = false;
        });
        // CITIES
        builder.addCase(getAllCities.fulfilled, (state, action) => {
            state.allCities = action.payload;
            state.loadings.cities = false;
        });
        builder.addCase(getAllCities.pending, (state, action) => {
            state.loadings.cities = true;
        });
        builder.addCase(getAllCities.rejected, (state, action) => {
            state.loadings.cities = false;
        });
    },
});

export const { setSearch, resetSearch, setSearchFilter, setSearchCity, setCategory } =
    SearchSlice.actions;

export const searchReducer = SearchSlice.reducer;
