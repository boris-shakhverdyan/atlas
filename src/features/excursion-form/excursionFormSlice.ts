import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormChangeValByKey } from '../forms/formsSlice';
import { CategoryApi } from '../../types/categories.types.';
import { CityApi } from '../../types/cities.types';
import {
    ExcursionApi,
    ExcursionKind,
    ExcursionsPayment,
    ExcursionTransport,
} from '../../types/excursions.types';
import { HasID } from '../../types/common.types';
import { handleTokenRefreshedRequest } from '../../utils/handleThunkAuth';
import { ExcursionsCreateRequest } from '../../types/api/excursion.api.types';
import { ExcursionServiceApi } from '../../http/api/excursion.api';
import { FetchApi } from '../../http/api/fetch.api';
import { LocationServiceApi } from '../../http/api/locations.api';
import { LocationsCreateRequest } from '../../types/api/locations.api.types';
import { DetailsCreateRequest } from '../../types/api/details.api.types';
import { DetailsServiceApi } from '../../http/api/details.api';
import { ExtraDetailsServiceApi } from '../../http/api/extra_details.api';
import { CityServiceApi } from '../../http/api/cities.api';
import { CategoryServiceApi } from '../../http/api/categories.api';
import { allAges, allDurations, allPeopleCounts } from './allowedData';

interface GalleryItem {
    src?: string;
    description?: string;
    file: File | null;
}

type LocationItem = string;

export type TextDataExcursion = {
    title: string;
    slogan: string;
    description: string;
};
export type EnumerableSelectItem = {
    name: string;
    val: number;
} & HasID;

export interface ExcursionFormState {
    textData: TextDataExcursion;
    cost: string;
    main_photo: {
        src?: string;
        file: File | null;
    };
    selectData: {
        city: number;
        ageLimit: number;
        category: number;
        typeExcursion: number;
        duration: number;
        peoplesCount: number;
        transport: number;
        costType: number;
    };
    sending: {
        loading: boolean;
        success: boolean | null;
    };
    data: {
        details: string[];
        needKnow: string[];
        locations: Array<LocationItem>;
        gallery: Array<GalleryItem>;
    };
    allowedLoadings: {
        cities: boolean;
        categories: boolean;
        ex_kinds: boolean;
        ex_durations: boolean;
        peoples_counts: boolean;
        ages: boolean;
        transports: boolean;
        cost_types: boolean;
    };
    allowedCategories: CategoryApi[];
    allowedCities: CityApi[];
    allowedExcursionKinds: ExcursionKind[];
    allowedDurations: EnumerableSelectItem[];
    allowedPeoplesCounts: EnumerableSelectItem[];
    allowedAges: EnumerableSelectItem[];
    allowedTransports: ExcursionTransport[];
    allowedCostTypes: ExcursionsPayment[];
}

const initialState: ExcursionFormState = {
    cost: '',
    main_photo: {
        src: '',
        file: null,
    },
    selectData: {
        city: 0,
        category: 0,
        typeExcursion: 0,
        transport: 0,
        duration: 0,
        ageLimit: 1,
        peoplesCount: 0,
        costType: 0,
    },
    sending: {
        success: null,
        loading: false,
    },
    textData: {
        title: '',
        slogan: '',
        description: '',
    },
    data: {
        details: [''],
        needKnow: [''],
        locations: [],
        gallery: [],
    },
    allowedLoadings: {
        cities: false,
        categories: false,
        ex_kinds: false,
        ex_durations: false,
        peoples_counts: false,
        ages: false,
        transports: false,
        cost_types: false,
    },
    allowedCategories: [],
    allowedCities: [],
    allowedExcursionKinds: [],
    allowedDurations: allDurations,
    allowedPeoplesCounts: allPeopleCounts,
    allowedAges: allAges,
    allowedTransports: [],
    allowedCostTypes: [],
};

export const excursionCreate = createAsyncThunk(
    'excursion/create',
    async (
        request: {
            form: FormData;
            data: ExcursionsCreateRequest;
        },
        { dispatch },
    ) => {
        const res: ExcursionApi = await handleTokenRefreshedRequest(
            FetchApi.CreateExcursion,
            request.form,
        );

        if (res.id) {
            const reqLocations: LocationsCreateRequest = [
                ...request.data.locations.map((item) => {
                    return {
                        name: item,
                        description: item,
                        location: item,
                        duration: 1,
                        excursion: res.id,
                    };
                }),
            ];

            const reqDetails: DetailsCreateRequest = [
                ...request.data.details.map((item) => {
                    return {
                        text: item,
                        excursion: res.id,
                    };
                }),
            ];
            const reqImportant: DetailsCreateRequest = [
                ...request.data.important.map((item) => {
                    return {
                        text: item,
                        excursion: res.id,
                    };
                }),
            ];

            await handleTokenRefreshedRequest(LocationServiceApi.Create, reqLocations);
            await handleTokenRefreshedRequest(DetailsServiceApi.Create, reqDetails);
            await handleTokenRefreshedRequest(ExtraDetailsServiceApi.Create, reqImportant);
            return;
        }
        throw new Error('Ошибка создания экскурсии');
    },
);

export const getAllCategories = createAsyncThunk('all/categories/get', async (_, { dispatch }) => {
    const res = await CategoryServiceApi.Get({});
    return res.data;
});
export const getAllCities = createAsyncThunk('all/cities/get', async (_, { dispatch }) => {
    const res = await CityServiceApi.Get({});
    return res.data;
});
export const getTransports = createAsyncThunk('all/transports/get', async (_, { dispatch }) => {
    const res = await ExcursionServiceApi.GetTransports();
    return res.data;
});
export const getExKinds = createAsyncThunk('all/ex-kinds/get', async (_, { dispatch }) => {
    const res = await ExcursionServiceApi.GetKinds();
    return res.data;
});
export const getExPaymentTypes = createAsyncThunk(
    'all/ex-payments/get',
    async (_, { dispatch }) => {
        const res = await ExcursionServiceApi.GetPaymentsTypes();
        return res.data;
    },
);

//To do query for getting user by JWT
export const ExcursionFormSlice = createSlice({
    name: 'excursion/form',
    initialState,
    reducers: {
        addDetail: (state, action: PayloadAction<string>) => {
            state.data.details = [...state.data.details, action.payload];
        },
        addNeedKnow: (state, action: PayloadAction<string>) => {
            state.data.needKnow = [...state.data.needKnow, action.payload];
        },
        editDetail: (
            state,
            action: PayloadAction<{
                index: number;
                val: string;
            }>,
        ) => {
            const tempDetailData: string[] = JSON.parse(JSON.stringify(state.data.details));
            tempDetailData[action.payload.index] = action.payload.val;
            state.data.details = tempDetailData;
        },
        editNeedKnow: (
            state,
            action: PayloadAction<{
                index: number;
                val: string;
            }>,
        ) => {
            const tempNeedKnowData: string[] = JSON.parse(JSON.stringify(state.data.needKnow));
            tempNeedKnowData[action.payload.index] = action.payload.val;
            state.data.needKnow = tempNeedKnowData;
        },
        addLocation: (state) => {
            state.data.locations = [...state.data.locations, ''];
        },
        addGalleryItem: (
            state,
            action: PayloadAction<{
                src: string;
                file: File | null;
            }>,
        ) => {
            state.data.gallery = [
                ...state.data.gallery,
                {
                    src: action.payload.src,
                    description: '',
                    file: action.payload.file,
                },
            ];
        },

        handleSelectedCity: (state, action: PayloadAction<number>) => {
            state.selectData.city = action.payload;
        },
        setCost: (state, action: PayloadAction<string>) => {
            state.cost = action.payload;
        },

        handleSelectedDuration: (state, action: PayloadAction<number>) => {
            state.selectData.duration = action.payload;
        },
        handleSelectedCostType: (state, action: PayloadAction<number>) => {
            state.selectData.costType = action.payload;
        },
        handleSelectedPeoplesCount: (state, action: PayloadAction<number>) => {
            state.selectData.peoplesCount = action.payload;
        },
        handleSelectedCategory: (state, action: PayloadAction<number>) => {
            state.selectData.category = action.payload;
        },
        handleAgeLimit: (state, action: PayloadAction<number>) => {
            state.selectData.ageLimit = action.payload;
        },
        handleSelectedKindExcursion: (state, action: PayloadAction<number>) => {
            state.selectData.typeExcursion = action.payload;
        },
        handleSelectedTransport: (state, action: PayloadAction<number>) => {
            state.selectData.transport = action.payload;
        },
        handleTextExcursionForm: (
            state,
            action: PayloadAction<FormChangeValByKey<TextDataExcursion>>,
        ) => {
            const key = action.payload.keyField;
            const val = action.payload.val;

            const tempTextDataExcursionForm: TextDataExcursion = JSON.parse(
                JSON.stringify(state.textData),
            );
            tempTextDataExcursionForm[key] = val;

            state.textData = tempTextDataExcursionForm;
        },
        editGalleryItem: (
            state,
            action: PayloadAction<{
                index: number;
                prop: keyof GalleryItem;
                val: string | File;
            }>,
        ) => {
            const changingIndex = action.payload.index;
            const changingProperty = action.payload.prop;
            const newVal = action.payload.val;

            const tempGalleryState = state.data.gallery;
            if (changingProperty !== 'file') {
                tempGalleryState[changingIndex][changingProperty] = newVal as string;
            } else {
                tempGalleryState[changingIndex][changingProperty] = newVal as File;
            }
            state.data.gallery = tempGalleryState;
        },
        handleMainPhoto: (state, action: PayloadAction<{ file: File; src: string }>) => {
            state.main_photo = action.payload;
        },
        editLocation: (
            state: ExcursionFormState,
            action: PayloadAction<{
                index: number;
                val: string;
            }>,
        ) => {
            state.data.locations = state.data.locations.map((item, index) => {
                if (index === action.payload.index) {
                    return action.payload.val;
                }
                return item;
            });
        },
        deleteLocation: (state: ExcursionFormState, action: PayloadAction<number>) => {
            state.data.locations = state.data.locations.filter(
                (item, index) => index !== action.payload,
            );
        },
        deleteGalleryItem: (state: ExcursionFormState, action: PayloadAction<number>) => {
            state.data.gallery = state.data.gallery.filter(
                (item, index) => index !== action.payload,
            );
        },
        resetForm: (state) => {
            state.cost = '';
            state.main_photo = {
                src: '',
                file: null,
            };
            state.selectData = {
                city: 0,
                category: 0,
                typeExcursion: 0,
                transport: 0,
                duration: 0,
                ageLimit: 1,
                peoplesCount: 0,
                costType: 0,
            };
            state.sending = {
                success: null,
                loading: false,
            };
            state.textData = {
                title: '',
                slogan: '',
                description: '',
            };
            state.data = {
                details: [''],
                needKnow: [''],
                locations: [],
                gallery: [],
            };
            state.allowedCategories = [];
            state.allowedCities = [];
            state.allowedExcursionKinds = [];
            state.allowedDurations = [];
            state.allowedPeoplesCounts = [];
            state.allowedAges = [];
            state.allowedTransports = [];
            state.allowedCostTypes = [];
        },
    },
    extraReducers: (builder) => {
        //CREATE EXCURSION
        builder.addCase(excursionCreate.pending, (state, action) => {
            state.sending.loading = true;
            state.sending.success = null;
        });
        builder.addCase(excursionCreate.fulfilled, (state, action) => {
            state.sending.success = true;
            state.sending.loading = false;
        });
        builder.addCase(excursionCreate.rejected, (state, action) => {
            state.sending.loading = false;
            state.sending.success = false;
        });
        //GET ALL CITIES
        builder.addCase(getAllCities.pending, (state, action) => {
            state.allowedLoadings.cities = true;
        });
        builder.addCase(getAllCities.fulfilled, (state, action) => {
            state.allowedLoadings.cities = false;
            state.allowedCities = action.payload;
        });
        builder.addCase(getAllCities.rejected, (state, action) => {
            state.allowedLoadings.cities = false;
        });
        //GET ALL CATEGORIES
        builder.addCase(getAllCategories.pending, (state, action) => {
            state.allowedLoadings.categories = true;
        });
        builder.addCase(getAllCategories.fulfilled, (state, action) => {
            state.allowedLoadings.categories = false;
            state.allowedCategories = action.payload;
        });
        builder.addCase(getAllCategories.rejected, (state, action) => {
            state.allowedLoadings.categories = false;
        });
        //GET ALL KINDS
        builder.addCase(getExKinds.pending, (state, action) => {
            state.allowedLoadings.ex_kinds = true;
        });
        builder.addCase(getExKinds.fulfilled, (state, action) => {
            state.allowedLoadings.ex_kinds = false;
            state.allowedExcursionKinds = action.payload;
        });
        builder.addCase(getExKinds.rejected, (state, action) => {
            state.allowedLoadings.ex_kinds = false;
        });
        //GET ALL TRANSPORTS
        builder.addCase(getTransports.pending, (state, action) => {
            state.allowedLoadings.transports = true;
        });
        builder.addCase(getTransports.fulfilled, (state, action) => {
            state.allowedLoadings.transports = false;
            state.allowedTransports = action.payload;
        });
        builder.addCase(getTransports.rejected, (state, action) => {
            state.allowedLoadings.transports = false;
        });
        //GET ALL PAYMENTS
        builder.addCase(getExPaymentTypes.pending, (state, action) => {
            state.allowedLoadings.cost_types = true;
        });
        builder.addCase(getExPaymentTypes.fulfilled, (state, action) => {
            state.allowedLoadings.cost_types = false;
            state.allowedCostTypes = action.payload;
        });
        builder.addCase(getExPaymentTypes.rejected, (state, action) => {
            state.allowedLoadings.cost_types = false;
        });
    },
});

export const excursionFormReducer = ExcursionFormSlice.reducer;
export const {
    addLocation,
    handleTextExcursionForm,
    addGalleryItem,
    editDetail,
    addDetail,
    addNeedKnow,
    handleSelectedCategory,
    handleSelectedCity,
    handleSelectedDuration,
    handleSelectedCostType,
    resetForm,
    handleMainPhoto,
    setCost,
    handleSelectedPeoplesCount,
    handleSelectedTransport,
    editGalleryItem,
    handleSelectedKindExcursion,
    editLocation,
    handleAgeLimit,
    deleteGalleryItem,
    editNeedKnow,
    deleteLocation,
} = ExcursionFormSlice.actions;
