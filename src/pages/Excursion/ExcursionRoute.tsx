import { useParams } from 'react-router-dom';
import Excursion from '.';
import NotFound from '../NotFound';

export const ExcursionRoute = () => {
    const params = useParams();
    const paramId = params?.id;
    const numberedId = Number(paramId);
    const IdIsCorrect = !isNaN(numberedId);

    if (IdIsCorrect) {
        if (numberedId > 0) {
            return <Excursion />;
        }
        return <NotFound />;
    }

    return <NotFound />;
};
