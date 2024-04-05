import { JWT } from '../types/user.types';
import { deleteCookie, getCookie, setCookie } from './CookieUtil';

const DAYS = 30;
export const storeTokens = (tokens: JWT) => {
    setCookie(
        'tokens',
        {
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
        },
        DAYS,
    );
};

export const getTokens = (): JWT => {
    return getCookie('tokens') as JWT;
};

export const deleteTokens = () => {
    deleteCookie('tokens');
};
