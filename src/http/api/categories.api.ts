import { AxiosResponse } from 'axios/index';
import { PATHS, api } from '../instance';
import { ConvertDataToGetParams } from '../../utils/ConvertDataToGetParams';
import { CategoriesGetRequest } from '../../types/api/categories.api.types';
import { CategoryApi } from '../../types/categories.types.';

export class CategoryServiceApi {
    static async Get(req: CategoriesGetRequest): Promise<AxiosResponse<CategoryApi[]>> {
        const res: AxiosResponse<CategoryApi[]> = await api.get(
            PATHS.CITIES_GET + ConvertDataToGetParams(req),
        );
        return res;
    }
}
