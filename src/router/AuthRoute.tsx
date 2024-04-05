import { FC, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteProps } from '../types/router.types';
import { useAppDispatch } from '../app/hooks';
import { handleLogin } from '../features/modals/modalsSlice';
import useToken from '../hooks/useToken';
import { getCookie, deleteCookie } from '../utils/CookieUtil';

const REDIRECT_PATH = '/';

const AuthRoute: FC<RouteProps> = ({ Component }) => {
    const dispatch = useAppDispatch();
    const token = useToken();
    // const {isLoading} = useAppSelector(state => state.profile)

    useEffect(() => {
        if (token) {
            //dispatch(getUser());
        }
    }, [token]);

    if (!token) {
        if (getCookie('tokens')) {
            deleteCookie('tokens');
        }
        dispatch(handleLogin());
        return <Navigate to={REDIRECT_PATH} />;
    }

    return token ? <Component /> : <div>Загрузка...</div>;
};

export default AuthRoute;
