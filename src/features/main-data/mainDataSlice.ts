import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ExcursionApi } from '../../types/excursions.types';
import { CategoryApi } from '../../types/categories.types.';
import { CityApi } from '../../types/cities.types';
import { ReviewApi } from '../../types/reviews.types';
import { generateReviews } from '../../utils/factories/reviewFactory';
import { ExcursionServiceApi } from '../../http/api/excursion.api';
import { ExcursionsGetRequest } from '../../types/api/excursion.api.types';
import { CitiesGetRequest } from '../../types/api/cities.api.types';
import { CityServiceApi } from '../../http/api/cities.api';
import { CategoriesGetRequest } from '../../types/api/categories.api.types';
import { CategoryServiceApi } from '../../http/api/categories.api';

export interface MainDataState {
    popularExcursions: ExcursionApi[];
    popularCategories: CategoryApi[];
    popularReviews: ReviewApi[];
    popularCities: CityApi[];
    popularPlaces: any[];
    loadings: {
        p_excursions: boolean;
        p_categories: boolean;
        p_cities: boolean;
        p_reviews: boolean;
    };
}

const initialState: MainDataState = {
    popularCities: [],
    popularReviews: [],
    popularCategories: [],
    popularExcursions: [],
    popularPlaces: [],
    loadings: {
        p_excursions: false,
        p_categories: false,
        p_cities: false,
        p_reviews: false,
    },
};

export const getPopularExcursions = createAsyncThunk(
    'popular/excursions/get',
    async (_, { dispatch }) => {
        const params: ExcursionsGetRequest = {
            limit: '12',
            ordering: 'count_of_books',
        };
        const res = await ExcursionServiceApi.Get(params);
        return res.data;
    },
);

export const getPopularCities = createAsyncThunk('popular/cities/get', async (_, { dispatch }) => {
    const params: CitiesGetRequest = {
        limit: '6',
        ordering: 'num_excursions',
    };
    const res = await CityServiceApi.Get(params);
    return res.data;
});

export const getPopularCategories = createAsyncThunk(
    'popular/categories/get',
    async (_, { dispatch }) => {
        const params: CategoriesGetRequest = {};
        const res = await CategoryServiceApi.Get(params);
        return res.data;
    },
);
export const getPopularReviews = createAsyncThunk(
    'popular/reviews/get',
    async (_, { dispatch }) => {
        //const res: AxiosResponse<any> = await OrderApi.GetCanOrderByCity(request)
        return new Promise<ReviewApi[]>((res, rej) => {
            setTimeout(() => {
                res(generateReviews(3));
            }, 1000);
        });
    },
);

export const MainData = createSlice({
    name: 'main_data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // EXCURSIONS
        builder.addCase(getPopularExcursions.fulfilled, (state, action) => {
            state.popularExcursions = action.payload;
            state.loadings.p_excursions = false;
        });
        builder.addCase(getPopularExcursions.pending, (state, action) => {
            state.loadings.p_excursions = true;
        });
        builder.addCase(getPopularExcursions.rejected, (state, action) => {
            state.loadings.p_excursions = false;
        });
        // CITIES
        builder.addCase(getPopularCities.fulfilled, (state, action) => {
            state.popularCities = action.payload;
            state.loadings.p_cities = false;
        });
        builder.addCase(getPopularCities.pending, (state, action) => {
            state.loadings.p_cities = true;
        });
        builder.addCase(getPopularCities.rejected, (state, action) => {
            state.loadings.p_cities = false;
        });
        // CATEGORIES
        builder.addCase(getPopularCategories.fulfilled, (state, action) => {
            state.popularCategories = action.payload;
            state.loadings.p_categories = false;
        });
        builder.addCase(getPopularCategories.pending, (state, action) => {
            state.loadings.p_categories = true;
        });
        builder.addCase(getPopularCategories.rejected, (state, action) => {
            state.loadings.p_categories = false;
        });
        // REVIEWS
        builder.addCase(getPopularReviews.fulfilled, (state, action) => {
            state.popularReviews = action.payload;
            state.loadings.p_reviews = false;
        });
        builder.addCase(getPopularReviews.pending, (state, action) => {
            state.loadings.p_reviews = true;
        });
        builder.addCase(getPopularReviews.rejected, (state, action) => {
            state.loadings.p_reviews = false;
        });
    },
});

// export const {} = MainData.actions;
export const mainDataReducer = MainData.reducer;
