import { FC } from 'react';

export interface RouteProps {
    path?: string;
    Component: FC;
}

export type RoutesList = Array<RouteProps>;
