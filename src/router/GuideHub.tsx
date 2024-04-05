import { useAppSelector } from '../app/hooks';
import { Navigate, Route, Routes } from 'react-router-dom';
import ExcursionFormContainer from '../pages/Account/Guide/NewExcursion';

const GuideHub = () => {
    const { data, isLoading } = useAppSelector((state) => state.profile);

    if (!isLoading && data.phone.length > 0) {
        if (!data.is_gid) {
            return <Navigate to={'/profile'} />;
        }
    }

    return (
        <Routes>
            <Route path={'/excursions/form/create/'} element={<ExcursionFormContainer />} />
        </Routes>
    );
};

export default GuideHub;
