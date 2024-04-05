import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteProps } from '../types/router.types';
import useAccount from '../hooks/useAccount';

const REDIRECT_PATH = '/profile';
const NonAuthRoute: FC<RouteProps> = ({ Component }) => {
    const isAuth = useAccount();

    return isAuth ? <Navigate to={REDIRECT_PATH} /> : <Component />;
};

export default NonAuthRoute;
