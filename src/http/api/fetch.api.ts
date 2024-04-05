import { PATHS } from '../instance';
import sendReq from '../instance/query';

export class FetchApi {
    static async EditAvatar(req: FormData): Promise<any> {
        const res = sendReq({ url: PATHS.USER_PROFILE, method: 'PUT', data: req, auth: true });
        return res;
    }
    static async CreateExcursion(req: FormData): Promise<any> {
        const res = sendReq({ url: PATHS.EXCURSION_CREATE, method: 'POST', data: req, auth: true });
        console.log(res);

        return res;
    }
}
