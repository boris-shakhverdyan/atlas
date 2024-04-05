import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    AccessUserLoginData,
    AccessUserRegisterData,
    ChangePasswordData,
    OrderFormData,
    SelectionExcursionData,
    ToGuideData,
    UserData,
} from '../../types/user.types';
import { validate } from '../../utils/validator';
import {
    authRules,
    ChangePasswordRules,
    MIN_DESCRIPTION_GUIDE_COUNT,
    orderRules,
    registerRules,
    selectionRules,
    ToGuideRules,
} from '../../config/validation/forms.rules';
import { isValidUrl } from '../../utils/checkValidURL';

export type RegisterFormType = AccessUserRegisterData &
    UserData & {
        description?: string;
    };

export type AuthFormType = AccessUserLoginData;
export type SelectionFormType = SelectionExcursionData;

type FormSliceState = {
    loginFormRedirect: boolean;
    registerForm: {
        data: RegisterFormType;
        errors: Record<string, string>;
        disabledBtn: boolean;
        isHiddenErrsValid: boolean;
    };
    authForm: {
        data: AuthFormType;
        errors: Record<string, string>;
        disabledBtn: boolean;
        isHiddenErrsValid: boolean;
    };
    selectionForm: {
        data: SelectionFormType;
        errors: Record<string, string>;
        disabledBtn: boolean;
        isHiddenErrsValid: boolean;
    };
    changePasswordForm: {
        data: ChangePasswordData;
        errors: Record<string, string>;
        disabledBtn: boolean;
        isHiddenErrsValid: boolean;
    };
    toGuideForm: {
        data: ToGuideData;
        errors: Record<string, string>;
        disabledBtn: boolean;
        isHiddenErrsValid: boolean;
    };
    orderForm: {
        data: OrderFormData;
        errors: Record<string, string>;
        disabledBtn: boolean;
        isHiddenErrsValid: boolean;
    };
};

export type Rule<FormType> = {
    key: keyof FormType;
    pattern?: RegExp;
    err?: string;
};

export type FormChangeValByKey<FormType> = {
    keyField: keyof FormType;
    val: string;
};

const initialState: FormSliceState = {
    loginFormRedirect: true,
    registerForm: {
        data: {
            email: '',
            description: '',
            first_name: '',
            last_name: '',
            password: '',
            phone: '',
            is_gid: false,
        },
        errors: {},
        disabledBtn: true,
        isHiddenErrsValid: true,
    },
    authForm: {
        data: {
            email_or_phone: '',
            password: '',
        },
        errors: {},
        disabledBtn: true,
        isHiddenErrsValid: true,
    },
    selectionForm: {
        data: {
            phone: '',
            name: '',
        },
        errors: {},
        disabledBtn: true,
        isHiddenErrsValid: true,
    },
    changePasswordForm: {
        data: {
            old_password: '',
            new_password: '',
            new_password_again: '',
        },
        errors: {},
        disabledBtn: true,
        isHiddenErrsValid: true,
    },
    toGuideForm: {
        data: {
            video_presentation: '',
            description: '',
        },
        errors: {},
        disabledBtn: true,
        isHiddenErrsValid: true,
    },
    orderForm: {
        data: {
            phone: '',
            name: '',
            email: '',
            date: '',
        },
        errors: {},
        disabledBtn: true,
        isHiddenErrsValid: true,
    },
};

export const FormsSlice = createSlice({
    name: 'forms',
    initialState,
    reducers: {
        handleRegisterForm: (
            state,
            action: PayloadAction<FormChangeValByKey<RegisterFormType>>,
        ) => {
            const key = action.payload.keyField;
            const val = action.payload.val;

            const tempRegisterForm: RegisterFormType = JSON.parse(
                JSON.stringify(state.registerForm.data),
            );
            const guideKey = 'is_gid';

            if (key !== guideKey && key !== 'id' && key in state.registerForm.data) {
                console.log(key);

                tempRegisterForm[key] = val;
            }

            const { first_name, last_name, password, phone, email, description, is_gid } =
                tempRegisterForm;
            const descriptionStr = String(description);
            const isNotFilled =
                (is_gid ? descriptionStr.length < MIN_DESCRIPTION_GUIDE_COUNT : false) ||
                !first_name ||
                !last_name ||
                !password ||
                phone.includes('_') ||
                phone.length < 16 ||
                !email;

            state.registerForm = {
                data: { ...tempRegisterForm },
                errors: !isNotFilled
                    ? validate<RegisterFormType>(tempRegisterForm, registerRules)
                    : {},
                disabledBtn: isNotFilled,
                isHiddenErrsValid: true,
            };
        },
        handleAuthForm: (state, action: PayloadAction<FormChangeValByKey<AuthFormType>>) => {
            const key = action.payload.keyField;
            const val = action.payload.val;

            const tempAuthForm: AuthFormType = JSON.parse(JSON.stringify(state.authForm.data));
            tempAuthForm[key] = val;

            const { email_or_phone, password } = tempAuthForm;
            const isNotFilled = !email_or_phone || !password;

            state.authForm = {
                data: { ...tempAuthForm },
                errors: !isNotFilled ? validate<AuthFormType>(tempAuthForm, authRules) : {},
                disabledBtn: isNotFilled,
                isHiddenErrsValid: true,
            };
        },
        handleSelectionForm: (
            state,
            action: PayloadAction<FormChangeValByKey<SelectionFormType>>,
        ) => {
            const key = action.payload.keyField;
            const val = action.payload.val;

            const tempSelectionForm: SelectionFormType = JSON.parse(
                JSON.stringify(state.selectionForm.data),
            );
            tempSelectionForm[key] = val;

            const { phone, name } = tempSelectionForm;
            const isNotFilled = !phone || !name;

            state.selectionForm = {
                data: { ...tempSelectionForm },
                errors: !isNotFilled
                    ? validate<SelectionFormType>(tempSelectionForm, selectionRules)
                    : {},
                disabledBtn: isNotFilled,
                isHiddenErrsValid: true,
            };
        },
        handleChangePasswordForm: (
            state,
            action: PayloadAction<FormChangeValByKey<ChangePasswordData>>,
        ) => {
            const key = action.payload.keyField;
            const val = action.payload.val;

            const tempChangePasswordForm: ChangePasswordData = JSON.parse(
                JSON.stringify(state.changePasswordForm.data),
            );
            tempChangePasswordForm[key] = val;

            const { old_password, new_password, new_password_again } = tempChangePasswordForm;
            const isNotFilled = !old_password || !new_password || !new_password_again;
            const newPasswordIsSmall = new_password.length < 8;
            const isNotEqualPswds = new_password !== new_password_again;

            state.changePasswordForm = {
                data: { ...tempChangePasswordForm },
                errors: !isNotFilled
                    ? validate<ChangePasswordData>(tempChangePasswordForm, ChangePasswordRules)
                    : {},
                disabledBtn: isNotFilled || newPasswordIsSmall || isNotEqualPswds,
                isHiddenErrsValid: true,
            };
        },
        handleToGuideForm: (state, action: PayloadAction<FormChangeValByKey<ToGuideData>>) => {
            const key = action.payload.keyField;
            const val = action.payload.val;

            const tempToGuideForm: ToGuideData = JSON.parse(JSON.stringify(state.toGuideForm.data));
            tempToGuideForm[key] = val;

            const { description, video_presentation } = tempToGuideForm;
            const smallDescription = description.length < MIN_DESCRIPTION_GUIDE_COUNT;
            const incorrectURL =
                video_presentation.length > 0 ? !isValidUrl(video_presentation) : false;
            const disabledBtn = smallDescription || incorrectURL;

            state.toGuideForm = {
                data: { ...tempToGuideForm },
                errors: !disabledBtn ? validate<ToGuideData>(tempToGuideForm, ToGuideRules) : {},
                disabledBtn: disabledBtn,
                isHiddenErrsValid: true,
            };
        },
        handleOrderForm: (state, action: PayloadAction<FormChangeValByKey<OrderFormData>>) => {
            const key = action.payload.keyField;
            const val = action.payload.val;

            const tempOrderForm: OrderFormData = JSON.parse(JSON.stringify(state.orderForm.data));
            const { phone, name } = tempOrderForm;
            const isNotFilled = !phone || !name;

            tempOrderForm[key] = val;

            state.orderForm = {
                data: { ...tempOrderForm },
                errors: !isNotFilled ? validate<OrderFormData>(tempOrderForm, orderRules) : {},
                disabledBtn: isNotFilled,
                isHiddenErrsValid: true,
            };
        },
        handleRegisterGuide: (state) => {
            state.registerForm.data = {
                ...state.registerForm.data,
                is_gid: !state.registerForm.data.is_gid,
            };
        },
        resetRegisterForm: (state) => {
            state.registerForm.data = {
                email: '',
                first_name: '',
                last_name: '',
                description: '',
                password: '',
                phone: '',
                is_gid: false,
            };
            state.registerForm.disabledBtn = true;
        },
        resetRegisterFormData: (state) => {
            state.registerForm.data = {
                email: '',
                first_name: '',
                last_name: '',
                password: '',
                description: '',
                phone: '',
                is_gid: state.registerForm.data.is_gid,
            };
        },
        resetAuthForm: (state) => {
            state.authForm.data = {
                email_or_phone: '',
                password: '',
            };
            state.authForm.disabledBtn = true;
        },
        resetSelectionForm: (state) => {
            state.selectionForm.data = {
                name: '',
                phone: '',
            };
            state.selectionForm.disabledBtn = true;
        },
        resetOrderForm: (state) => {
            state.orderForm.data = {
                name: '',
                phone: '',
                email: '',
                date: '',
            };
            state.orderForm.disabledBtn = true;
        },
        resetToGuideForm: (state) => {
            state.toGuideForm.data = {
                description: '',
                video_presentation: '',
            };
            state.toGuideForm.disabledBtn = true;
        },
        setSelectionForm: (state, action: PayloadAction<SelectionFormType>) => {
            state.selectionForm.data = action.payload;
        },
        setOrderForm: (state, action: PayloadAction<OrderFormData>) => {
            state.orderForm.data = action.payload;
        },

        resetChangePasswordForm: (state) => {
            state.changePasswordForm.data = {
                new_password: '',
                new_password_again: '',
                old_password: '',
            };
            state.changePasswordForm.disabledBtn = true;
        },
        handleVisibilityValidationErrs: (state) => {
            state.registerForm.isHiddenErrsValid = !state.registerForm.isHiddenErrsValid;
        },
        handleVisibilityAuthErrs: (state) => {
            state.authForm.isHiddenErrsValid = !state.authForm.isHiddenErrsValid;
        },
        handleVisibilitySelectionErrs: (state) => {
            state.selectionForm.isHiddenErrsValid = !state.selectionForm.isHiddenErrsValid;
        },
    },
});

export const {
    resetRegisterForm,
    handleRegisterGuide,
    handleRegisterForm,
    setSelectionForm,
    handleVisibilityValidationErrs,
    handleVisibilityAuthErrs,
    handleVisibilitySelectionErrs,
    handleSelectionForm,
    setOrderForm,
    resetOrderForm,
    resetAuthForm,
    resetRegisterFormData,
    resetToGuideForm,
    resetChangePasswordForm,
    handleOrderForm,
    handleToGuideForm,
    resetSelectionForm,
    handleChangePasswordForm,
    handleAuthForm,
} = FormsSlice.actions;
export const formsReducer = FormsSlice.reducer;
