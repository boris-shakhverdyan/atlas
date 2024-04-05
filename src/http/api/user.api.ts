import { AxiosResponse } from 'axios/index';
import { ChangePasswordData } from '../../types/user.types';
import { PATHS, api, authApi } from '../instance';
import {
    EditAvatarRequest,
    EditProfileRequest,
    EditProfileResponse,
    GetProfileResponse,
    LoginRequest,
    LoginResponse,
    MakeGuideAccountRequest,
    RefreshRequest,
    RefreshResponse,
    RegisterRequest,
    RegisterResponse,
} from '../../types/api/user.api.types';
import { OrderApi } from '../../types/order.types';
import { CreateOrderRequest } from '../../types/api/order.api.types';

export class UserApi {
    static async Registration(req: RegisterRequest): Promise<RegisterResponse> {
        const res: AxiosResponse<RegisterResponse> = await api.post(PATHS.USER_REGISTER, {
            ...req,
        });
        return res;
    }
    static async Login(req: LoginRequest): Promise<AxiosResponse<LoginResponse>> {
        const res: AxiosResponse<LoginResponse> = await api.post(PATHS.USER_LOGIN, { ...req });
        return res;
    }

    static async RefreshToken(req: RefreshRequest): Promise<RefreshResponse> {
        const res: AxiosResponse<RefreshResponse> = await api.post(PATHS.USER_TOKEN_REFRESH, {
            ...req,
        });
        return res.data;
    }
    static async CreateOrder(req: CreateOrderRequest): Promise<AxiosResponse<OrderApi>> {
        const res: AxiosResponse<OrderApi> = await authApi.post(PATHS.BOOKING_CREATE, { ...req });
        if (!res.data) {
            throw res;
        }
        return res;
    }
    static async GetUser(): Promise<GetProfileResponse> {
        const res: GetProfileResponse = await authApi.get(PATHS.USER_PROFILE);
        if (!res.data) {
            throw res;
        }
        return res;
    }
    static async GetOrders(): Promise<AxiosResponse<OrderApi[]>> {
        const res: AxiosResponse<OrderApi[]> = await authApi.get(PATHS.USER_GET_BOOKINGS);
        if (!res.data) {
            throw res;
        }
        return res;
    }
    static async GetOrderById(req: { id: number }): Promise<AxiosResponse<OrderApi>> {
        const res: AxiosResponse<OrderApi> = await authApi.get(
            `${PATHS.ORDER_GET_BY_ID}/${req.id}`,
        );
        if (!res.data) {
            throw res;
        }
        return res;
    }
    static async EditUser(
        req: EditProfileRequest | MakeGuideAccountRequest,
    ): Promise<AxiosResponse<EditProfileResponse>> {
        const res: AxiosResponse<EditProfileResponse> = await authApi.put(PATHS.USER_PROFILE, req);
        if (!res.data) {
            throw res;
        }
        return res;
    }
    static async EditAvatar(req: EditAvatarRequest): Promise<AxiosResponse<EditProfileResponse>> {
        console.log(req);

        const res: AxiosResponse<EditProfileResponse> = await authApi.put(PATHS.USER_PROFILE, req);

        if (!res.data) {
            throw res;
        }
        return res;
    }
    static async ChangePassword(req: ChangePasswordData): Promise<AxiosResponse<any>> {
        const res: AxiosResponse<ChangePasswordData> = await authApi.post(
            PATHS.USER_CHANGE_PASSWORD,
            req,
        );
        if (!res.data) {
            throw res;
        }
        return res;
    }
}
