import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExcursionApi, ExcursionProps } from '../../types/excursions.types';
import { ExcursionServiceApi } from '../../http/api/excursion.api';
import { ExcursionsGetRequest } from '../../types/api/excursion.api.types';

export type GuideState = {
    excursions: ExcursionProps[];
    loadings: {
        excursions: boolean;
    };
    deleting: {
        loading: boolean;
        success: boolean | null;
    };
    currentDeleting: Pick<ExcursionApi, 'title' | 'id'>;
};

export const deleteExcursion = createAsyncThunk(
    'excursion/delete',
    async (req: { id: number }, { dispatch }) => {
        const res = await ExcursionServiceApi.Delete({ id: req.id });
        return res;
    },
);
export const getGuideExcursions = createAsyncThunk(
    'guider/excursions/get',
    async (req: { guide_id: number }, { dispatch }) => {
        const params: ExcursionsGetRequest = {
            guide: String(req.guide_id),
        };
        const res = await ExcursionServiceApi.Get(params);
        return res.data;
    },
);

const initialState: GuideState = {
    excursions: [],
    loadings: {
        excursions: false,
    },
    deleting: {
        success: null,
        loading: false,
    },
    currentDeleting: {
        id: 0,
        title: '',
    },
};

export const Guide = createSlice({
    name: 'guide',
    initialState,
    reducers: {
        setCurrentDeleting: (state, action: PayloadAction<typeof initialState.currentDeleting>) => {
            state.currentDeleting = action.payload;
        },
        resetCurrentDeleting: (state) => {
            state.currentDeleting = {
                id: 0,
                title: '',
            };
        },
        resetDeletingStatus: (state) => {
            state.deleting = {
                success: null,
                loading: false,
            };
        },
        removeExcursion: (state, action: PayloadAction<number>) => {
            state.excursions = state.excursions.filter((item) => item.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        // DELETING
        builder.addCase(deleteExcursion.fulfilled, (state, action) => {
            state.deleting.loading = false;
            state.deleting.success = true;
        });
        builder.addCase(deleteExcursion.pending, (state, action) => {
            state.deleting.loading = true;
            state.deleting.success = null;
        });
        builder.addCase(deleteExcursion.rejected, (state, action) => {
            state.deleting.loading = false;
            state.deleting.success = false;
        });
        // GET GUIDE EXCURSIONS
        builder.addCase(getGuideExcursions.fulfilled, (state, action) => {
            state.excursions = action.payload;
            state.loadings.excursions = false;
        });
        builder.addCase(getGuideExcursions.pending, (state, action) => {
            state.loadings.excursions = true;
        });
        builder.addCase(getGuideExcursions.rejected, (state, action) => {
            state.loadings.excursions = false;
        });
    },
});

export const { setCurrentDeleting, resetCurrentDeleting, removeExcursion, resetDeletingStatus } =
    Guide.actions;
export const guideReducer = Guide.reducer;
