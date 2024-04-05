import { AxiosResponse } from 'axios';
import {
    AccessUserLoginData,
    AccessUserRegisterData,
    JWT,
    ProfileData,
    UserData,
} from '../user.types';

export type LoginRequest = AccessUserLoginData;
export type LoginResponse = JWT;

export type RegisterRequest = AccessUserRegisterData &
    Pick<UserData, 'first_name' | 'last_name'> & {
        description?: string;
    };
export type RegisterResponse = any;

export type RefreshRequest = {
    refresh: string;
};
export type RefreshResponse = {
    refresh: string;
    access: string;
};
export type GetProfileResponse = AxiosResponse<ProfileData>;

export type EditProfileRequest = Pick<
    ProfileData,
    'description' | 'email' | 'is_gid' | 'video_presentation' | 'first_name' | 'last_name'
>;

export type EditProfileResponse = GetProfileResponse;

export type MakeGuideAccountRequest = Pick<
    EditProfileRequest,
    'video_presentation' | 'is_gid' | 'description'
>;
export type EditAvatarRequest = any;
