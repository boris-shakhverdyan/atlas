import { useEffect } from 'react';
import List from '../../../components/List';
import styles from './ordersHistory.module.scss';
import useProfileLayoutTitle from '../../../hooks/useProfileLayoutTitle';
import { OrderCard } from '../../../components/Cards/OrderCard';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { CustomSpinner } from '../../../components/Preloader';
import { getOrders } from '../../../features/profile/profileSlice';
import BookingInfoModal from '../../../components/Modals/BookingInfo';

const OrdersHistory = () => {
    const dispatch = useAppDispatch();
    const { loadings, orders } = useAppSelector((state) => state.profile);
    const { booking } = useAppSelector((state) => state.modals);

    useProfileLayoutTitle('История заказов');

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    return (
        <>
            {loadings.orders ? (
                <div className={`d-f w-100p ${styles.historyLoader}`}>
                    <CustomSpinner height={140} width={140} />
                </div>
            ) : orders.length ? (
                <List
                    listBlockClassname={'d-f f-column flex-wrap gap-30'}
                    list={orders}
                    renderItem={(item) => <OrderCard {...item} />}
                />
            ) : (
                <p className={'emptyText'}>Вы не бронировали ни одной экскурсии.</p>
            )}
            {booking ? <BookingInfoModal /> : null}
        </>
    );
};

export default OrdersHistory;
