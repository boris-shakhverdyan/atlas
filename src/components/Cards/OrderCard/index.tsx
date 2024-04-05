import { FC } from 'react'
import styles from './orderCard.module.scss'
import { ArrowShortRightIcon } from '../../../icons'
import { OrderApi } from '../../../types/order.types'
import { useAppDispatch } from '../../../app/hooks'
import { getOrderById } from '../../../features/profile/profileSlice'
import { handleBooking } from '../../../features/modals/modalsSlice'

export const OrderCard: FC<OrderApi> = (props) => {
    const dispatch = useAppDispatch()

    const handleOpenBooking = () => {
        dispatch(getOrderById({ id: props.id }))
        dispatch(handleBooking())
    }

    return (
        <div onClick={handleOpenBooking} className={`${styles.orderCard} bg-white pd-20 f-column gap-20 cur-pointer`}>
            <div className="top f-row-betw">
                <h3>Бронирование №{props.id}</h3>
                <div className={`${styles.status} ${styles.statusDesktop} pd-5 status-blue c-white`}>
                    В обработке
                </div>
            </div>
            <div className={`${styles.bottom} f-row-betw`}>
                <div className={`${styles.dates} d-f gap-25 flex-wrap`}>
                    <div className="f-column">
                        <div className={`${styles.labelTitle}`}>Дата проведения:</div>
                        <div className={`${styles.label} colorPurple fw-5`}>{props.travel_date}</div>
                    </div>
                    <div className="f-column">
                        <div className={`${styles.labelTitle}`}>Дата проведения:</div>
                        <div className={`${styles.label} colorPurple fw-5`}>{props.order_date}</div>
                    </div>
                </div>
                <div className={`f-row-betw ${styles.blockToModal}`}>
                    <div className={`${styles.status} ${styles.statusMobile} pd-5 status-green c-white`}>
                        Оплачено
                    </div>
                    <div>
                        <ArrowShortRightIcon width={12} height={30} />
                    </div>
                </div>


            </div>
        </div>
    )
}
