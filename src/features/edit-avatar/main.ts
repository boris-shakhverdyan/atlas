import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Crop, PixelCrop } from 'react-image-crop';

export interface EditAvatarSliceType {
    crop: Crop | null;
    previewCrop: PixelCrop | null;
    imgSrc: string;
    err: string;
    step: number;
}

const initialState: EditAvatarSliceType = {
    crop: null,
    previewCrop: null,
    imgSrc: '',
    err: '',
    step: 0,
};

export const EditAvatarSlice = createSlice({
    name: 'avatar/edit',
    initialState,
    reducers: {
        setCrop: (state, action: PayloadAction<Crop>) => {
            state.crop = action.payload;
        },
        setPreviewCrop: (state, action: PayloadAction<PixelCrop>) => {
            state.previewCrop = action.payload;
        },
        setErr: (state, action: PayloadAction<string>) => {
            state.err = action.payload;
        },
        setStep: (state, action: PayloadAction<number>) => {
            state.step = action.payload;
        },
        setImgSrc: (state, action: PayloadAction<string>) => {
            state.imgSrc = action.payload;
        },

        resetEditAvatar: (state) => {
            state.crop = null;
            state.err = '';
            state.imgSrc = '';
            state.step = 0;
        },
        resetCrop: (state) => {
            state.crop = null;
        },
    },
});

export const { setCrop, setErr, setStep, setPreviewCrop, setImgSrc, resetCrop, resetEditAvatar } =
    EditAvatarSlice.actions;
export const editAvatarReducer = EditAvatarSlice.reducer;
