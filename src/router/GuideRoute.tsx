import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteProps } from '../types/router.types';
import { useAppSelector } from '../app/hooks';

const GuideRoute: FC<RouteProps> = ({ Component }) => {
    const { data, isLoading } = useAppSelector((state) => state.profile);

    if (!isLoading && data.phone.length > 0) {
        if (!data.is_gid) {
            return <Navigate to={'/profile'} />;
        }
    }
    return <Component />;
};

export default GuideRoute;
