import axios from 'axios';
import { getCookie } from '../../utils/CookieUtil';
import { getTokens } from '../../utils/storeTokens';
import { PATHS } from '../paths/api.paths';

const currentDomain = 0;
const domains = ['https://www.atlas8.ru'];
const devMode = true;
const domain = !devMode ? `${process.env.REACT_APP_DOMAIN}` : domains[currentDomain];

const URL = domain + '/api';

const authApi = axios.create({
    baseURL: URL,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${getCookie('tokens')?.access_token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

const api = axios.create({
    baseURL: URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

authApi.interceptors.response.use(null, (ctx) => {
    const res = ctx;
    if (res.code === 'ERR_NETWORK') {
        //alert("ошибка соединения")
    }
    return res;
});

authApi.interceptors.request.use(
    (config) => {
        const tokens = getTokens();
        const accessToken = tokens?.access_token;
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);
export { authApi, api, PATHS, domain };
