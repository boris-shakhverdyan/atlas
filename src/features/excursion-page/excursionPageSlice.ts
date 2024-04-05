import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ExcursionApi, ExcursionProps } from '../../types/excursions.types';
import { ImageApi } from '../../types/images.types';
import { LocationApi } from '../../types/locations.types';
import { ReviewApi } from '../../types/reviews.types';
import { generateExcursions } from '../../utils/factories/excursionFactory';
import {
    CreateReviewRequest,
    CreateReviewResponse,
    ReviewsGetRequest,
} from '../../types/api/review.api.types';
import { ReviewServiceApi } from '../../http/api/review.api';
import { AxiosResponse } from 'axios';
import { handleTokenRefreshedRequest } from '../../utils/handleThunkAuth';
import { ExcursionServiceApi } from '../../http/api/excursion.api';
import { ExcursionsGetRequest } from '../../types/api/excursion.api.types';
import { LocationServiceApi } from '../../http/api/locations.api';
import { LocationsGetRequest } from '../../types/api/locations.api.types';
import { ImagesGetRequest } from '../../types/api/images.api.types';
import { ImageServiceApi } from '../../http/api/images.api';
import { CreateOrderRequest } from '../../types/api/order.api.types';
import { UserApi } from '../../http/api/user.api';
import { OrderApi } from '../../types/order.types';

export type ExcursionPageStateType = {
    pageStatus: {
        finded: boolean | null;
    };
    similar: ExcursionProps[];
    photos: ImageApi[];
    locations: LocationApi[];
    reviews: ReviewApi[];
    ex_data: ExcursionApi;
    orderStatus: {
        sending: boolean;
        success: boolean | null;
    };
    reviewForm: {
        sending: boolean;
        alreadySended: boolean;
    };
    loadings: {
        ex_data: boolean;
        photos: boolean;
        similar: boolean;
        locations: boolean;
        reviews: boolean;
    };
};
export const getExcursion = createAsyncThunk(
    'excursion/get',
    async (request: { id: number }, { dispatch }) => {
        const res: AxiosResponse<ExcursionApi> = await ExcursionServiceApi.GetById(request.id);
        if (res.data) {
            dispatch(getExPhotos({ id: request.id }));
            dispatch(getExLocations({ id: request.id }));
            dispatch(getExReviews({ id: request.id }));
            dispatch(getExSimilar({ city_id: res.data.city.id, categories: res.data.categories }));
        }
        return res.data;
    },
);

export const getExPhotos = createAsyncThunk(
    'excursion/images/get',
    async (request: { id: number }, { dispatch }) => {
        const params: ImagesGetRequest = {
            excursion: `${request.id}`,
        };
        const res = await ImageServiceApi.Get(params);
        return res.data;
    },
);

export const createReview = createAsyncThunk(
    'excursion/review/create',
    async (request: CreateReviewRequest, { dispatch }) => {
        const res: AxiosResponse<CreateReviewResponse> = await handleTokenRefreshedRequest(
            ReviewServiceApi.Create,
            request,
        );
        return res.data;
    },
);
export const createOrder = createAsyncThunk(
    'excursion/order/create',
    async (request: CreateOrderRequest, { dispatch }) => {
        const res: AxiosResponse<OrderApi> = await handleTokenRefreshedRequest(
            UserApi.CreateOrder,
            request,
        );
        return res.data;
    },
);

export const getExReviews = createAsyncThunk(
    'excursion/reviews/get',
    async (request: { id: number }, { dispatch }) => {
        const params: ReviewsGetRequest = {
            excursion: `${request.id}`,
        };
        const res = await ReviewServiceApi.Get(params);
        return res.data;
    },
);
export const getExSimilar = createAsyncThunk(
    'excursion/similar/get',
    async (request: { city_id: number; categories: number[] }, { dispatch }) => {
        const params: ExcursionsGetRequest = {
            limit: '12',
            ordering: 'count_of_books',
            city: `${request.city_id}`,
            categories: String(request.categories[0]),
        };
        const res = await ExcursionServiceApi.Get(params);
        return res.data;
    },
);
export const getExLocations = createAsyncThunk(
    'excursion/locations/get',
    async (request: { id: number }, { dispatch }) => {
        const params: LocationsGetRequest = {
            excursion: `${request.id}`,
        };
        const res = await LocationServiceApi.GetByExcursion(params);
        return res.data;
    },
);

const initialState: ExcursionPageStateType = {
    pageStatus: {
        finded: null,
    },
    orderStatus: {
        sending: false,
        success: null,
    },
    similar: [],
    photos: [],
    locations: [],
    reviews: [],
    reviewForm: {
        sending: false,
        alreadySended: false,
    },
    ex_data: generateExcursions(2)[1],
    loadings: {
        similar: false,
        ex_data: false,
        photos: false,
        locations: false,
        reviews: false,
    },
};

export const ExcursionPageState = createSlice({
    name: 'excursion/page',
    initialState,
    reducers: {
        resetOrderStatus: (state) => {
            state.orderStatus = {
                sending: false,
                success: null,
            };
        },
        resetData: (state) => {
            state.pageStatus = {
                finded: null,
            };
            state.similar = [];
            state.photos = [];
            state.locations = [];
            state.reviews = [];
            state.reviewForm = {
                sending: false,
                alreadySended: false,
            };
            state.ex_data = generateExcursions(2)[1];
            state.loadings = {
                similar: false,
                ex_data: false,
                photos: false,
                locations: false,
                reviews: false,
            };
        },
    },
    extraReducers: (builder) => {
        // EXCURSION
        builder.addCase(getExcursion.fulfilled, (state, action) => {
            state.ex_data = action.payload;
            state.pageStatus.finded = true;
            state.loadings.ex_data = false;
        });
        builder.addCase(getExcursion.pending, (state, action) => {
            state.loadings.ex_data = true;
            state.pageStatus.finded = null;
        });
        builder.addCase(getExcursion.rejected, (state, action) => {
            state.loadings.ex_data = false;
            const isBadReq = action.error.code === 'ERR_BAD_REQUEST';
            if (isBadReq) {
                state.pageStatus.finded = false;
            }
        });

        // EXCURSION PHOTOS
        builder.addCase(getExPhotos.fulfilled, (state, action) => {
            state.photos = action.payload;
            state.loadings.photos = false;
        });
        builder.addCase(getExPhotos.pending, (state, action) => {
            state.loadings.photos = true;
        });
        builder.addCase(getExPhotos.rejected, (state, action) => {
            state.loadings.photos = false;
        });

        // EXCURSION LOCATIONS
        builder.addCase(getExLocations.fulfilled, (state, action) => {
            state.locations = action.payload;
            state.loadings.locations = false;
        });
        builder.addCase(getExLocations.pending, (state, action) => {
            state.loadings.locations = true;
        });
        builder.addCase(getExLocations.rejected, (state, action) => {
            state.loadings.locations = false;
        });

        // EXCURSION REVIEWS
        builder.addCase(getExReviews.fulfilled, (state, action) => {
            state.reviews = action.payload;
            state.loadings.reviews = false;
        });
        builder.addCase(getExReviews.pending, (state, action) => {
            state.loadings.reviews = true;
        });
        builder.addCase(getExReviews.rejected, (state, action) => {
            state.loadings.reviews = false;
        });
        // EXCURSION SIMILAR
        builder.addCase(getExSimilar.fulfilled, (state, action) => {
            state.similar = action.payload;
            state.loadings.similar = false;
        });
        builder.addCase(getExSimilar.pending, (state, action) => {
            state.loadings.similar = true;
        });
        builder.addCase(getExSimilar.rejected, (state, action) => {
            state.loadings.similar = false;
        });
        // EXCURSION REVIEW
        builder.addCase(createReview.fulfilled, (state, action) => {
            state.reviewForm.sending = false;
            state.reviewForm.alreadySended = true;
        });
        builder.addCase(createReview.pending, (state, action) => {
            state.reviewForm.sending = true;
        });
        builder.addCase(createReview.rejected, (state, action) => {
            state.reviewForm.sending = false;
        });
        // EXCURSION ORDER
        builder.addCase(createOrder.fulfilled, (state, action) => {
            state.orderStatus.sending = false;
            state.orderStatus.success = true;
        });
        builder.addCase(createOrder.pending, (state, action) => {
            state.orderStatus.sending = true;
            state.orderStatus.success = null;
        });
        builder.addCase(createOrder.rejected, (state, action) => {
            state.orderStatus.sending = false;
            state.orderStatus.success = false;
        });
    },
});

export const { resetData, resetOrderStatus } = ExcursionPageState.actions;
export const excursionPageReducer = ExcursionPageState.reducer;
