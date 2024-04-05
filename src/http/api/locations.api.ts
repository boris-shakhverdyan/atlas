import { AxiosResponse } from 'axios/index';
import { PATHS, api, authApi } from '../instance';
import { ConvertDataToGetParams } from '../../utils/ConvertDataToGetParams';
import { LocationApi } from '../../types/locations.types';
import { LocationsCreateRequest, LocationsGetRequest } from '../../types/api/locations.api.types';

export class LocationServiceApi {
    static async GetByExcursion(req: LocationsGetRequest): Promise<AxiosResponse<LocationApi[]>> {
        const res: AxiosResponse<LocationApi[]> = await api.get(
            PATHS.LOCATIONS_GET + ConvertDataToGetParams(req),
        );
        return res;
    }
    static async Create(req: LocationsCreateRequest): Promise<AxiosResponse<LocationApi[]>> {
        const res: AxiosResponse<LocationApi[]> = await authApi.post(PATHS.LOCATIONS_GET, req);
        return res;
    }
}
