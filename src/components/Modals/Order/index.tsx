import { FC, HTMLInputTypeAttribute, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import ShadowWrapper from '../../ShadowWrapper';
import ModalBody from '../ModalBody';
import { ArrowShortIcon, CloseIcon, SuccessGreenIcon } from '../../../icons';
import InputField from '../../TextFields/InputField';
import styles from './orderModal.module.scss';
import UnfilledButton from '../../Buttons/UnfilledButton';
import { handleOrder } from '../../../features/modals/modalsSlice';
import { ExcursionApi } from '../../../types/excursions.types';
import { OrderFormData } from '../../../types/user.types';
import {
    FormChangeValByKey,
    handleOrderForm,
    resetOrderForm,
    setOrderForm,
} from '../../../features/forms/formsSlice';
import InputMask from 'react-input-mask';
import useToken from '../../../hooks/useToken';
import { formatPhoneNumber } from '../../../utils/formatePhone';
import { CreateOrderRequest } from '../../../types/api/order.api.types';
import { CustomSpinner } from '../../Preloader';
import { createOrder, resetOrderStatus } from '../../../features/excursion-page/excursionPageSlice';
import { useNavigate } from 'react-router-dom';
import { extractDigits } from '../../../utils/normalizePhone';

type OrderInputProps = {
    placeholder: string;
    typeInput?: HTMLInputTypeAttribute;
} & FormChangeValByKey<OrderFormData>;

const OrderInput: FC<OrderInputProps> = ({ keyField, placeholder, val, typeInput }) => {
    const dispatch = useAppDispatch();

    if (keyField === 'phone') {
        return (
            <InputMask
                value={val}
                mask={'+9(999)999-99-99'}
                placeholder={'+7'}
                onChange={(e) =>
                    dispatch(
                        handleOrderForm({
                            keyField: keyField,
                            val: e.target.value,
                        }),
                    )
                }
            />
        );
    }
    return (
        <input
            type={typeInput}
            onChange={(e) =>
                dispatch(
                    handleOrderForm({
                        keyField: keyField,
                        val: e.target.value,
                    }),
                )
            }
            value={val}
            placeholder={placeholder}
            className={`f-1`}
        />
    );
};

type OrderModalProps = Pick<
    ExcursionApi,
    'id' | 'people_limit' | 'title' | 'tour_price' | 'cost' | 'payment_type' | 'price_variant'
>;
const OrderModal: FC<OrderModalProps> = (props) => {
    const dispatch = useAppDispatch();
    const token = useToken();
    const navigate = useNavigate();

    const [countPeople, setCountPeople] = useState(1);
    const { orderForm } = useAppSelector((state) => state.forms);
    const { orderStatus } = useAppSelector((state) => state.excursionPageData);
    const profile = useAppSelector((state) => state.profile.data);

    const handlePlusPeople = () => {
        setCountPeople((prevState) => {
            if (prevState < props.people_limit) {
                return prevState + 1;
            }
            return prevState;
        });
    };
    const handleMinusPeople = () => {
        setCountPeople((prevState) => {
            if (prevState === 1) {
                return prevState;
            }
            return prevState - 1;
        });
    };

    const orderSend = () => {
        dispatch(resetOrderStatus());
        const request: CreateOrderRequest = {
            excursion: props.id,
            cnt_of_people: countPeople,
            email: orderForm.data.email,
            phone: extractDigits(orderForm.data.phone),
            travel_date: orderForm.data.date,
            full_name: orderForm.data.name,
        };
        dispatch(createOrder(request));
    };
    const handleModal = () => dispatch(handleOrder());

    const handleToMyBookings = () => {
        navigate('/profile/history');
        handleModal();
    };

    useEffect(() => {
        if (token) {
            dispatch(
                setOrderForm({
                    name: profile.first_name,
                    email: profile.email,
                    phone: formatPhoneNumber(profile.phone),
                    date: '',
                }),
            );
        }
        return () => {
            dispatch(resetOrderForm());
            dispatch(resetOrderStatus());
        };
    }, [dispatch, profile.email, profile.first_name, profile.phone, token]);

    return (
        <ShadowWrapper onClick={handleModal}>
            <ModalBody className={styles.orderWindow}>
                <div onClick={handleModal} className="f-c-col w-content p-abs modalCloseBtn">
                    <CloseIcon width={24} height={24} />
                </div>
                {orderStatus.success ? (
                    <>
                        <div className="f-column gap-20 al-center txt-center">
                            <h2 className="section-subtitle">Успешно забронировано</h2>
                            <SuccessGreenIcon />
                            <UnfilledButton
                                onClick={handleToMyBookings}
                                title={'Мои бронирования'}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="f-column gap-5">
                            <h2 className="section-subtitle">Записаться на экскурсию</h2>
                            <p className={`${styles.excursionTitle} fw-5`}>{props.title}</p>
                        </div>
                        <div className={`${styles.form} f-1 gap-20 f-column`}>
                            <div className={`f-row-betw gap-20 ${styles.orderFields}`}>
                                <InputField
                                    wrapperClass={`bx-shadow d-f al-end w-100p pd-20 `}
                                    className={'w-100p'}
                                    inputId={'s'}
                                    fieldName={'Дата*'}
                                >
                                    <OrderInput
                                        placeholder={''}
                                        keyField={'date'}
                                        typeInput={'date'}
                                        val={orderForm.data.date}
                                    />
                                </InputField>
                                <InputField
                                    wrapperClass={`bx-shadow d-f al-end w-100p pd-20 `}
                                    className={'w-100p'}
                                    inputId={'s'}
                                    fieldName={'Имя*'}
                                >
                                    <OrderInput
                                        placeholder={'Иван'}
                                        keyField={'name'}
                                        val={orderForm.data.name}
                                    />
                                </InputField>
                            </div>
                            <div className={`f-row-betw gap-20 ${styles.orderFields}`}>
                                <InputField
                                    wrapperClass={`bx-shadow d-f al-end w-100p pd-20`}
                                    className={'w-100p'}
                                    inputId={'s'}
                                    fieldName={'Телефон*'}
                                >
                                    <OrderInput
                                        placeholder={'Телефон'}
                                        keyField={'phone'}
                                        val={orderForm.data.phone}
                                    />
                                </InputField>
                                <InputField
                                    wrapperClass={`bx-shadow d-f al-end w-100p pd-20`}
                                    className={'w-100p'}
                                    inputId={'s'}
                                    fieldName={'Почта*'}
                                >
                                    <OrderInput
                                        placeholder={'email@domain.com'}
                                        keyField={'email'}
                                        val={orderForm.data.email}
                                    />
                                </InputField>
                            </div>
                            <div className={`${styles.peoples} f-row-betw`}>
                                <div className="d-f al-center gap-10">
                                    <div className={`fw-6 ${styles.peopleCountLabel}`}>
                                        Кол-во участников
                                    </div>
                                    <div className="d-f al-center gap-10">
                                        <div
                                            onClick={handleMinusPeople}
                                            className="f-c-col w-content"
                                        >
                                            <ArrowShortIcon />
                                        </div>
                                        <div className={`${styles.peopleCount} f-c-col`}>
                                            <input
                                                value={countPeople}
                                                readOnly={true}
                                                type="text"
                                            />
                                        </div>
                                        <div
                                            onClick={handlePlusPeople}
                                            style={{ transform: 'rotateZ(180deg)' }}
                                            className="f-c-col w-content"
                                        >
                                            <ArrowShortIcon />
                                        </div>
                                    </div>
                                </div>
                                <p className={styles.orderMaxCountText}>
                                    Максимальное кол-во участников: {props.people_limit}
                                </p>
                            </div>
                        </div>
                        <div className="f-row-betw">
                            <div className={`${styles.priceBlock} f-column w-100p`}>
                                <b>{props.cost} ₽</b>
                                <div className={styles.for}>{props.payment_type.name}</div>
                            </div>
                            {orderStatus.sending ? (
                                <CustomSpinner height={30} width={30} />
                            ) : (
                                <div className="f-column gap-5 w-100p">
                                    <UnfilledButton
                                        disabled={
                                            orderForm.disabledBtn ||
                                            Object.keys(orderForm.errors).length > 0
                                        }
                                        onClick={orderSend}
                                        className={`w-100p f-05 ${styles.orderButton}`}
                                        title={'Оплатить'}
                                    />
                                    {orderStatus.success === false ? (
                                        <div className="errColor txt-center">
                                            Не удалось забронировать
                                        </div>
                                    ) : null}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </ModalBody>
        </ShadowWrapper>
    );
};

export default OrderModal;
