export type UserData = {
    id?: number;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    is_gid: boolean;
};
export type ProfileData = {
    description: string;
    profile_photo: string | null; // Может быть строкой или null, в зависимости от того, содержит ли изображение
    video_presentation: string;
    balance: string; // Может быть числом, если используется для финансовых операций
} & UserData;

export interface AccessUserLoginData {
    password: string;
    email_or_phone: string;
}

export interface AccessUserRegisterData {
    email: string;
    password: string;
    phone: string;
}

export type SelectionExcursionData = {
    phone: string;
    name: string;
};
export type ChangePasswordData = {
    old_password: string;
    new_password: string;
    new_password_again: string;
};
export type ToGuideData = {
    description: string;
    video_presentation: string;
};
export type OrderFormData = {
    phone: string;
    name: string;
    date: string;
    email: string;
};

export type JWT = {
    access_token?: string;
    refresh_token?: string;
};

export type AuthResponse = JWT & UserData;
