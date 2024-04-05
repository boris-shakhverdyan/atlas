import Main from '../pages/Main';
import { RoutesList } from '../types/router.types';
import Login from '../pages/Login';
import ProfileContainer from '../pages/Account/Profile';
import GuideHub from './GuideHub';
import NotFound from '../pages/NotFound';
import DocumentPage from '../pages/Document';
import { CityRoute } from '../pages/City/CityRoute';
import ExcursionCreated from '../pages/ExcursionCreated';

export interface RoutesCollection {
    auth: RoutesList;
    public: RoutesList;
    non_auth: RoutesList;
}

export const routes: RoutesCollection = {
    public: [
        {
            Component: Main,
            path: '/',
        },
        {
            Component: CityRoute,
            path: '/city/:id',
        },
        {
            Component: DocumentPage,
            path: '/doc',
        },
        {
            Component: ExcursionCreated,
            path: '/created-successfully',
        },
        {
            Component: NotFound,
            path: '*',
        },
    ],
    auth: [
        {
            Component: ProfileContainer,
            path: '/profile/auth/',
        },
        {
            Component: GuideHub,
            path: '/guide/*',
        },
    ],
    non_auth: [
        {
            Component: Login,
            path: '/login',
        },
    ],
};
