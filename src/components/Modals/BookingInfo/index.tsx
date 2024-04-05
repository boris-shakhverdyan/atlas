
import ShadowWrapper from "../../ShadowWrapper";
import ModalBody from "../ModalBody";
import { CloseIcon } from "../../../icons";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { handleBooking } from "../../../features/modals/modalsSlice";
import styles from './booking.module.scss'
import { CustomSpinner } from "../../Preloader";

const BookingInfoModal = () => {
    const dispatch = useAppDispatch()
    const { loadings, bookingData } = useAppSelector(state => state.profile)
    const handleModal = () => dispatch(handleBooking())
    return (
        <ShadowWrapper onClick={handleModal}>
            <ModalBody className={`${styles.bookingWindow} f-column-betw`}>
                <div onClick={handleModal} className="f-c-col w-content p-abs modalCloseBtn">
                    <CloseIcon width={24} height={24} />
                </div>

                <div className="f-column gap-20 w-100p">
                    <h2 className={`${styles.title} d-f gap-10 flex-wrap`}>Бронирование <p className={"d-f gap-5"}>№
                        {!loadings.booking ?
                            bookingData.id :
                            <div className="d-f">
                                <CustomSpinner height={14} width={14} />
                            </div>}
                    </p></h2>
                    <div className="bookingInfo d-f jc-between w-100p">
                        <div className="f-column gap-15 w-100p">
                            <div className="d-f jc-between">
                                <div className="f-column">
                                    <div className={`${styles.label}`}>Заказчик:</div>
                                    {
                                        !loadings.booking ?
                                            <div className={`${styles.label} colorPurple fw-5`}>{bookingData.full_name}</div> :
                                            <div className="d-f">
                                                <CustomSpinner height={14} width={14} />
                                            </div>

                                    }

                                </div>
                                <div className="f-column al-end">
                                    <div className={`${styles.label}`}>Статус:</div>
                                    {
                                        !loadings.booking ?
                                            <div className={`${styles.label} colorPurple fw-5`}>{bookingData.status}</div> :
                                            <div className="d-f">
                                                <CustomSpinner height={14} width={14} />
                                            </div>
                                    }
                                </div>
                            </div>
                            <div className="d-f jc-between">
                                <div className="f-column">
                                    <div className={`${styles.label}`}>Дата оформления:</div>

                                    {
                                        !loadings.booking ?
                                            <div className={`${styles.label} colorPurple fw-5`}>{bookingData.order_date}</div> :
                                            <div className="d-f">
                                                <CustomSpinner height={14} width={14} />
                                            </div>
                                    }
                                </div>
                                <div className="f-column al-end">
                                    <div className={`${styles.label}`}>Кол-во лиц:</div>
                                    {
                                        !loadings.booking ?
                                            <div className={`${styles.label} colorPurple fw-5`}>{bookingData.cnt_of_people}</div> :
                                            <div className="d-f">
                                                <CustomSpinner height={14} width={14} />
                                            </div>
                                    }
                                </div>

                            </div>
                            <div className="d-f jc-between">
                                <div className="f-column">
                                    <div className={`${styles.label}`}>Дата проведения:</div>
                                    {
                                        !loadings.booking ?
                                            <div className={`${styles.label} colorPurple fw-5`}>{bookingData.travel_date}</div> :
                                            <div className="d-f">
                                                <CustomSpinner height={14} width={14} />
                                            </div>
                                    }

                                </div>
                                <div className={`${styles.label} ${styles.payment} txt-center cur-pointer p-rel c-black fw-5`}>Оплатить</div>
                            </div>
                            <div className="d-f jc-between">
                                <div className="f-column">
                                    <div className={`${styles.label}`}>Идентификатор экскурсии:</div>
                                    <div className={`${styles.label} colorPurple fw-5`}>{bookingData.excursion}</div>
                                </div>
                                <div className="f-column al-end">
                                    <div className={`${styles.label}`}>ИТОГО:</div>
                                    
                                    {
                                        !loadings.booking ?
                                        <div className={`${styles.resultSum} fw-7 colorPurple fw-5`}>{bookingData.tour_price || 0} ₽</div> :
                                            <div className="d-f">
                                                <CustomSpinner height={24} width={24} />
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalBody>
        </ShadowWrapper>
    );
};

export default BookingInfoModal;