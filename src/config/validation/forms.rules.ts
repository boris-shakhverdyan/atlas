import {
    AuthFormType,
    RegisterFormType,
    Rule,
    SelectionFormType,
} from '../../features/forms/formsSlice';
import { ChangePasswordData, OrderFormData, ToGuideData } from '../../types/user.types';

export const MIN_DESCRIPTION_GUIDE_COUNT = 150;
export const MIN_REVIEW_COUNT = 50;

const registerRules: Array<Rule<RegisterFormType>> = [
    {
        key: 'email',
        pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        err: 'Неккоректно введён email',
    },
    {
        key: 'password',
        pattern: /^.{8,}$/,
        err: 'Минимум 8 символов',
    },
];
const authRules: Array<Rule<AuthFormType>> = [
    {
        key: 'email_or_phone',
        pattern: /^.{2,}$/,
        err: 'Email или телефон неккоректен!',
    },
    {
        key: 'password',
        pattern: /^.{8,}$/,
        err: 'Неккоректный пароль!',
    },
];
const selectionRules: Array<Rule<SelectionFormType>> = [
    {
        key: 'phone',
        pattern: /^.{2,}$/,
        err: 'Номер телефона неккоректен!',
    },
    {
        key: 'name',
        pattern: /^.{3,}$/,
        err: 'Минимум 3 символа',
    },
];
const ChangePasswordRules: Array<Rule<ChangePasswordData>> = [
    {
        key: 'old_password',
        pattern: /^.{8,}$/,
        err: 'Минимум 8 символов',
    },
    {
        key: 'new_password',
        pattern: /^.{8,}$/,
        err: 'Минимум 8 символов',
    },
];
const ToGuideRules: Array<Rule<ToGuideData>> = [
    {
        key: 'description',
        pattern: /^.{MIN_DESCRIPTION_GUIDE_COUNT,}$/,
        err: `Минимум ${MIN_DESCRIPTION_GUIDE_COUNT} символов`,
    },
];
const orderRules: Array<Rule<OrderFormData>> = [
    {
        key: 'phone',
        pattern: /^.{2,}$/,
        err: 'Номер телефона неккоректен!',
    },
    {
        key: 'name',
        pattern: /^.{3,}$/,
        err: 'Минимум 3 символа',
    },
    {
        key: 'email',
        pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        err: 'Неккоректно введён email',
    },
    {
        key: 'date',
        pattern: /^\d{4}-\d{2}-\d{2}$/,
        err: 'Неккоректно введена дата',
    },
];
export { registerRules, authRules, ToGuideRules, selectionRules, orderRules, ChangePasswordRules };
