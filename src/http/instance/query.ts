import { domain } from '.';
import { getTokens } from '../../utils/storeTokens';

type SendReqArgs = {
    url: string;
    method: string;
    auth: boolean;
    params?: any | null;
    data?: FormData | null;
    headers?: any;
};

async function sendReq({ url, method, params = {}, data, headers = {}, auth = true }: SendReqArgs) {
    const baseURL = domain;
    let endpoint = baseURL + '/api/' + url;
    if (params) {
        const queryParams = new URLSearchParams(params);
        endpoint += '?' + queryParams.toString();
    }

    const options = {
        method,
        headers: !auth
            ? {
                  ...headers,
              }
            : {
                  ...headers,
                  Authorization: `Bearer ${getTokens().access_token as string}`,
              },
        body: data,
    };
    try {
        const response = await fetch(endpoint, options);
        const responseData = await response.json();
        return responseData;
    } catch (e) {
        throw new Error('Ошибка sendReq');
    }
}

export default sendReq;
