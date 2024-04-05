import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChangePasswordData, ProfileData } from '../../types/user.types';
import { AxiosResponse } from 'axios';
import { UserApi } from '../../http/api/user.api';
import { handleTokenRefreshedRequest } from '../../utils/handleThunkAuth';
import {
    EditProfileRequest,
    GetProfileResponse,
    MakeGuideAccountRequest,
} from '../../types/api/user.api.types';
import { FormChangeValByKey } from '../forms/formsSlice';
import { MIN_DESCRIPTION_GUIDE_COUNT } from '../../config/validation/forms.rules';
import { validate } from '../../utils/validator';
import { OrderApi } from '../../types/order.types';
import { OrderByIdRequest } from '../../types/api/order.api.types';
import { isValidUrl } from '../../utils/checkValidURL';
import { FetchApi } from '../../http/api/fetch.api';

export interface ProfileState {
    changePassword: {
        sending: boolean;
        success: boolean;
    };
    editAvatar: {
        sending: boolean;
        success: boolean;
    };
    form: {
        data: ProfileData;
        errors: Record<string, string>;
        disabledBtn: boolean;
        disabledToGuideBtn: boolean;
        isHiddenErrsValid: boolean;
    };
    orders: OrderApi[];
    bookingData: OrderApi;

    loadings: {
        profile: boolean;
        booking: boolean;
        orders: boolean;
    };
    data: ProfileData;
    authorized: boolean;
    isLoading: boolean;
    loginLoading: boolean;
}

const initialState: ProfileState = {
    editAvatar: {
        sending: false,
        success: false,
    },
    changePassword: {
        sending: false,
        success: false,
    },
    form: {
        data: {
            email: '',
            last_name: '',
            phone: '',
            first_name: '',
            profile_photo: '',
            description: '',
            video_presentation: '',
            balance: '',
            is_gid: false,
        },
        errors: {},
        disabledBtn: true,
        disabledToGuideBtn: false,
        isHiddenErrsValid: true,
    },
    orders: [],
    bookingData: {
        id: 0,
        travel_date: '',
        tour_price: 0,
        email: '',
        excursion: 0,
        user: {
            email: '',
            last_name: '',
            first_name: '',
            phone: '',
            profile_photo: '',
        },
        phone: '',
        order_date: '',
        full_name: '',
        cnt_of_people: 0,
        status: '',
    },
    loadings: {
        orders: false,
        booking: false,
        profile: false,
    },
    data: {
        id: 0,
        email: '',
        last_name: '',
        phone: '',
        first_name: '',
        profile_photo: '',
        description: '',
        video_presentation: '',
        balance: '',
        is_gid: false,
    },
    authorized: true,
    isLoading: false,
    loginLoading: false,
};

export const getUser = createAsyncThunk('user/get', async (_, { dispatch }) => {
    const res: GetProfileResponse = await handleTokenRefreshedRequest(UserApi.GetUser);
    return res.data;
});
export const editUser = createAsyncThunk(
    'user/edit',
    async (request: EditProfileRequest | MakeGuideAccountRequest, { dispatch }) => {
        const res: any = await handleTokenRefreshedRequest(UserApi.EditUser, request);
        return res.data;
    },
);
export const editAvatarUser = createAsyncThunk(
    'user/edit/avatar',
    async (request: FormData, { dispatch }) => {
        const res: any = await handleTokenRefreshedRequest(FetchApi.EditAvatar, request);
        return res;
    },
);
export const changePasswordUser = createAsyncThunk(
    'user/change-password',
    async (request: ChangePasswordData, { dispatch }) => {
        const res: any = await handleTokenRefreshedRequest(UserApi.ChangePassword, request);
        return res.data;
    },
);

export const getOrders = createAsyncThunk('user/orders', async (_, { dispatch }) => {
    const res: AxiosResponse<OrderApi[]> = await handleTokenRefreshedRequest(UserApi.GetOrders);
    return res.data;
});

export const getOrderById = createAsyncThunk(
    'user/order',
    async (request: OrderByIdRequest, { dispatch }) => {
        const res: AxiosResponse<OrderApi> = await handleTokenRefreshedRequest(
            UserApi.GetOrderById,
            request,
        );
        return res.data;
    },
);

export const ProfileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setLoginLoading(state, action: PayloadAction<boolean>) {
            state.loginLoading = action.payload;
        },
        resetChangePasswordStatus(state) {
            state.changePassword = {
                sending: false,
                success: false,
            };
        },
        resetEditAvatarStatus(state) {
            state.editAvatar = {
                sending: false,
                success: false,
            };
        },

        handleProfileForm: (state, action: PayloadAction<FormChangeValByKey<ProfileData>>) => {
            let formsAreNotEquals = false;

            const key = action.payload.keyField;
            const val = action.payload.val;

            const tempProfileForm: ProfileData = JSON.parse(JSON.stringify(state.form.data));
            if (key !== 'is_gid' && key !== 'balance' && key !== 'id') {
                tempProfileForm[key] = val;
            }

            const formKeys = Object.keys(tempProfileForm);

            const ignoreForUser: Array<keyof ProfileData> = ['description'];
            const ignoreForBoth: Array<keyof ProfileData | string> = [
                'favorite_excursions',
                'video_presentation',
            ];

            const isNotFilledSome = formKeys.some((key) => {
                const validKey = key as keyof ProfileData;

                if (ignoreForBoth.includes(key)) {
                    if (state.data.is_gid) {
                        if (validKey === 'video_presentation') {
                            const incorrectURL =
                                tempProfileForm[validKey].length > 0
                                    ? !isValidUrl(tempProfileForm[validKey])
                                    : false;
                            return incorrectURL;
                        }
                        return false;
                    }
                    return false;
                } else {
                    if (!state.data.is_gid) {
                        if (ignoreForUser.includes(validKey)) {
                            return false;
                        }
                        return String(tempProfileForm[validKey]).length === 0;
                    }
                    if (validKey === 'description') {
                        return (
                            String(tempProfileForm[validKey]).length < MIN_DESCRIPTION_GUIDE_COUNT
                        );
                    }
                    return String(tempProfileForm[validKey]).length === 0;
                }
            });

            formKeys.forEach((key) => {
                if (!formsAreNotEquals) {
                    const validKey = key as keyof ProfileData;
                    const formVal = tempProfileForm[validKey];
                    const dataVal = state.data[validKey];

                    if (formVal?.toString() !== dataVal?.toString()) {
                        formsAreNotEquals = true;
                    }
                }
            });

            state.form = {
                data: { ...tempProfileForm },
                errors: validate<ProfileData>(tempProfileForm, []),
                disabledToGuideBtn: formsAreNotEquals,
                disabledBtn: !formsAreNotEquals || isNotFilledSome,
                isHiddenErrsValid: true,
            };
        },
    },
    extraReducers: (builder) => {
        //GET USER
        builder.addCase(getUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getUser.fulfilled, (state, action) => {
            if (action.payload) {
                state.data = action.payload;
                state.form.data = action.payload;
            }
            state.isLoading = false;
        });
        builder.addCase(getUser.rejected, (state, action) => {});
        //EDIT USER
        builder.addCase(editUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(editUser.fulfilled, (state, action) => {
            if (action.payload) {
                state.data = action.payload;
                state.form.data = action.payload;
            }
            state.isLoading = false;
        });
        builder.addCase(editUser.rejected, (state, action) => {
            state.isLoading = false;
        });
        //EDIT USER AVATAR
        builder.addCase(editAvatarUser.pending, (state, action) => {
            state.isLoading = true;
            state.editAvatar.sending = true;
        });
        builder.addCase(editAvatarUser.fulfilled, (state, action) => {
            if (action.payload) {
                console.log(action.payload);
                state.data = action.payload;
                state.form.data = action.payload;
            }
            state.isLoading = false;
            state.editAvatar.sending = false;
            state.editAvatar.success = true;
        });
        builder.addCase(editAvatarUser.rejected, (state, action) => {
            state.isLoading = false;
            state.editAvatar.sending = false;
        });
        //CHANGE PASSWORD USER
        builder.addCase(changePasswordUser.pending, (state, action) => {
            state.changePassword.sending = true;
        });
        builder.addCase(changePasswordUser.fulfilled, (state, action) => {
            if (action.payload) {
                state.changePassword.success = true;
            }
            state.changePassword.sending = false;
        });
        builder.addCase(changePasswordUser.rejected, (state, action) => {
            state.changePassword.sending = false;
        });

        //GET ORDERS
        builder.addCase(getOrders.pending, (state, action) => {
            state.loadings.orders = true;
        });
        builder.addCase(getOrders.fulfilled, (state, action) => {
            if (action.payload) {
                state.orders = action.payload;
            }
            state.loadings.orders = false;
        });
        builder.addCase(getOrders.rejected, (state, action) => {});
        //GET ORDER BY ID
        builder.addCase(getOrderById.pending, (state, action) => {
            state.loadings.booking = true;
        });
        builder.addCase(getOrderById.fulfilled, (state, action) => {
            if (action.payload) {
                state.bookingData = action.payload;
            }
            state.loadings.booking = false;
        });
        builder.addCase(getOrderById.rejected, (state, action) => {});
    },
});

export const {
    setLoginLoading,
    handleProfileForm,
    resetChangePasswordStatus,
    resetEditAvatarStatus,
} = ProfileSlice.actions;

export const profileReducer = ProfileSlice.reducer;
