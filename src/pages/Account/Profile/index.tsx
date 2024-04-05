import { FC } from 'react';
import SidePartLayout from '../../../layouts/SidePartLayout';
import Personal from '../Personal';
import SideBarProfile from '../../../components/SideBar/Profile';
import { Route, Routes, useLocation } from 'react-router-dom';
import OrdersHistory from '../OrdersHistory';
import GuideRoute from '../../../router/GuideRoute';
import GuideExcursions from '../Guide/Excursions';

const ProfileContainer: FC = () => {
    const location = useLocation();
    const path = location.pathname;

    return (
        <SidePartLayout tabsContent={<SideBarProfile currentTab={path} />}>
            <Routes>
                <Route path={'/'} element={<Personal />} />
                <Route path={'/history'} element={<OrdersHistory />} />
                <Route
                    path={'/guide/excursions'}
                    Component={() => <GuideRoute Component={GuideExcursions} />}
                />
            </Routes>
        </SidePartLayout>
    );
};

export default ProfileContainer;
