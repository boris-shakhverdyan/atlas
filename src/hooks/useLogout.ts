import { deleteCookie } from '../utils/CookieUtil';

export const useLogout = () => {
    return () => {
        deleteCookie('tokens');
        window.location.href = '/';
    };
};
