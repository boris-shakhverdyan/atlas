import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ExcursionApi } from '../../types/excursions.types';
import { CityApi } from '../../types/cities.types';
import { ReviewApi } from '../../types/reviews.types';
import { generateCities } from '../../utils/factories/cityFactory';
import { CategoryApi } from '../../types/categories.types.';
import { generateReviews } from '../../utils/factories/reviewFactory';
import { CityServiceApi } from '../../http/api/cities.api';
import { CategoriesGetRequest } from '../../types/api/categories.api.types';
import { CategoryServiceApi } from '../../http/api/categories.api';
import { ExcursionServiceApi } from '../../http/api/excursion.api';
import { ExcursionsGetRequest } from '../../types/api/excursion.api.types';

export type CityPageStateType = {
    pageStatus: {
        finded: boolean | null;
    };
    reviews: ReviewApi[];
    excursions: ExcursionApi[];
    categories: CategoryApi[];
    loadings: {
        city_data: boolean;
        categories: boolean;
        reviews: boolean;
        excursions: boolean;
    };
    city_data: CityApi;
};

export const getCity = createAsyncThunk(
    'city/get',
    async (request: { id: number }, { dispatch }) => {
        const res = await CityServiceApi.GetById(request.id);
        if (res.data) {
            dispatch(getCityExcursions({ id: request.id }));
        }
        return res.data;
    },
);

export const getCityExcursions = createAsyncThunk(
    'city/excursions/get',
    async (request: { id: number }, { dispatch }) => {
        const params: ExcursionsGetRequest = {
            limit: '12',
            ordering: 'count_of_books',
            city: `${request.id}`,
        };
        const res = await ExcursionServiceApi.Get(params);
        return res.data;
    },
);
export const getCityCategories = createAsyncThunk(
    'city/categories/get',
    async (request: { id: number }, { dispatch }) => {
        const params: CategoriesGetRequest = {
            city: String(request.id),
        };
        const res = await CategoryServiceApi.Get(params);
        return res.data;
    },
);

export const getCityReviews = createAsyncThunk(
    'city/reviews/get',
    async (request: { id: number }, { dispatch }) => {
        //const res: AxiosResponse<any> = await OrderApi.GetCanOrderByCity(request)
        return new Promise<ReviewApi[]>((res, rej) => {
            setTimeout(() => {
                res(generateReviews(3));
            }, 1000);
        });
    },
);

const initialState: CityPageStateType = {
    pageStatus: {
        finded: null,
    },
    loadings: {
        city_data: false,
        reviews: false,
        categories: false,
        excursions: false,
    },
    categories: [],
    reviews: generateReviews(3),
    excursions: [],
    city_data: generateCities(1)[0],
};

export const CityPageState = createSlice({
    name: 'city/page',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // CITY DATA
        builder.addCase(getCity.fulfilled, (state, action) => {
            state.city_data = action.payload;
            state.loadings.city_data = false;
            state.pageStatus.finded = true;
        });
        builder.addCase(getCity.pending, (state, action) => {
            state.loadings.city_data = true;
            state.pageStatus.finded = null;
        });
        builder.addCase(getCity.rejected, (state, action) => {
            state.loadings.city_data = false;
            state.pageStatus.finded = false;
        });

        // CITY CATEGORIES
        builder.addCase(getCityCategories.fulfilled, (state, action) => {
            console.log(action.payload);
            state.categories = action.payload;
            state.loadings.categories = false;
        });
        builder.addCase(getCityCategories.pending, (state, action) => {
            state.loadings.categories = true;
        });
        builder.addCase(getCityCategories.rejected, (state, action) => {
            state.loadings.categories = false;
        });
        // CITY EXCURSIONS
        builder.addCase(getCityExcursions.fulfilled, (state, action) => {
            console.log(action.payload);
            state.excursions = action.payload;
            state.loadings.excursions = false;
        });
        builder.addCase(getCityExcursions.pending, (state, action) => {
            state.loadings.excursions = true;
        });
        builder.addCase(getCityExcursions.rejected, (state, action) => {
            state.loadings.excursions = false;
        });
        // CITY REVIEWS
        builder.addCase(getCityReviews.fulfilled, (state, action) => {
            console.log(action.payload);
            state.reviews = action.payload;
            state.loadings.reviews = false;
        });
        builder.addCase(getCityReviews.pending, (state, action) => {
            state.loadings.reviews = true;
        });
        builder.addCase(getCityReviews.rejected, (state, action) => {
            state.loadings.reviews = false;
        });
    },
});

// export const {} = CityPageState.actions;
export const cityPageReducer = CityPageState.reducer;
