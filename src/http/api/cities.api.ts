import { AxiosResponse } from 'axios/index';
import { PATHS, api } from '../instance';
import { CitiesGetRequest } from '../../types/api/cities.api.types';
import { CityApi } from '../../types/cities.types';
import { ConvertDataToGetParams } from '../../utils/ConvertDataToGetParams';

export class CityServiceApi {
    static async Get(req: CitiesGetRequest): Promise<AxiosResponse<CityApi[]>> {
        const res: AxiosResponse<CityApi[]> = await api.get(
            PATHS.CITIES_GET + ConvertDataToGetParams(req),
        );
        return res;
    }
    static async GetById(req: number): Promise<AxiosResponse<CityApi>> {
        const res: AxiosResponse<CityApi> = await api.get(`${PATHS.CITIES_GET}/${req}`);
        return res;
    }
}
