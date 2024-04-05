import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './excursionCard.module.scss';
import { ClockIcon, DeleteIcon, FavoriteIcon, MovementIcon, PeopleIcon, SettingsIcon, StarBordered } from '../../../icons';
import UnfilledButton from '../../Buttons/UnfilledButton';
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useNavigate } from "react-router-dom";
import { ExcursionProps } from '../../../types/excursions.types';
import useFavorites from '../../../hooks/useFavorites';
import { setCurrentDeleting } from '../../../features/guide/guideSlice';
import { handleAcceptDelete } from '../../../features/modals/modalsSlice';
import { formatMinutesToHours } from '../../../utils/minutesToHoursString';

type ExcursionCardProps = {
    hidden?: boolean;
    isGuideExcursion?: boolean
    classNameMobile?: string,
    descriptionHidden?: boolean;
    controls?: boolean,
    className?: string,
    paid_status?: "paid" | "not_paid"
} & ExcursionProps

type ExcursionControlsProps = {
    excursion_id: number,
    title: string
}

export const ExcursionControls: FC<ExcursionControlsProps> = ({ excursion_id, title }) => {
    const dispatch = useAppDispatch()
    const [controlsOpened, setControlsOpened] = useState(false)

    const controlBlockRef = useRef<HTMLDivElement>(null);
    const controlPanelRef = useRef<HTMLDivElement>(null);

    const handleControlsOpened = () => setControlsOpened(!controlsOpened)

    // const handleEditExcursion = (e: React.MouseEvent<HTMLElement>) => {
    //     e.stopPropagation()
    //     alert("edit")
    // }
    const handleDeleteExcursion = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        dispatch(setCurrentDeleting({
            id: excursion_id,
            title
        }))
        dispatch(handleAcceptDelete())
    }
    const handleClickOutside = (e: any) => {
        if (controlPanelRef.current && !controlPanelRef.current.contains(e.target)) {
            if (controlBlockRef.current && !controlBlockRef.current.contains(e.target)) {
                setControlsOpened(false)
            }
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [])

    return (
        <div ref={controlBlockRef} onClick={(e) => e.stopPropagation()} className={`p-abs ${styles.controls}`}>
            <div onClick={handleControlsOpened} className={`${styles.block} f-c-col p-rel`}>
                <SettingsIcon width={20} height={20} />
                {controlsOpened ? <div ref={controlPanelRef} className={`${styles.panel} f-column gap-5 top-0 p-abs`}>
                    {/* <div onClick={e => handleEditExcursion(e)} className={styles.item}>
                        <EditIcon width={20} height={20} />
                    </div> */}
                    <div onClick={e => handleDeleteExcursion(e)} className={styles.item}>
                        <DeleteIcon strokeColor={"red"} width={20} height={20} />
                    </div>

                </div> : null}

            </div>
        </div>
    )
}


const ExcursionCard: FC<ExcursionCardProps> = (props) => {
    // const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const { isMobile } = useAppSelector(state => state.main)

    const { addToFavorites, isFavorite } = useFavorites(props.id)
    const handleToFavorite = () => addToFavorites(props)

    const handleToExcursion = () => {
        navigate(`/excursion/${props.id}`)
    }

    if (isMobile) {
        return (
            <div onClick={handleToExcursion} className={`d-f ${styles.excursionCardMobile} ${props.classNameMobile || ""} p-rel`}>
                <div style={{ backgroundImage: `url(${props.main_photo})` }} className={`${styles.image} bg-cover`}>

                </div>
                {props.paid_status ? <div className={`p-abs top-0 ${styles.status} ${styles.statusPaid}`}>Оплачено</div> : null}
                <div className={`${styles.mobileExcursionInfo} pd-10 f-column-betw w-100p`}>
                    <div className="f-column gap-5">
                        <h3>{props.city.name}</h3>
                        <div className={styles.title}>
                            {props.title}
                        </div>
                        <div className={styles.type}>{props.ex_type.name}</div>
                        <p>{props.description}</p>
                    </div>
                    <div className="f-row-betw">
                        <div className={`${styles.rating} d-f al-center gap-5`}>
                            <StarBordered strokeColor={'#D900B6'} />
                            <p>{props.rating}</p>
                        </div>
                        <div className={styles.price}>{props.cost || 0} ₽</div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div onClick={handleToExcursion}
            className={`${styles.excursionCard} ${styles.excursionCardLittle} cur-pointer f-column gap-10 ${props.hidden ? 'hidden' : ''}`}>
            {props.paid_status ? <div className={`p-abs top-0 ${styles.status} ${styles.statusPaid}`}>Оплачено</div> : null}
            {props.controls ? <ExcursionControls title={props.title} excursion_id={props.id} /> : null}
            <div
                style={{ backgroundImage: `url(${props.main_photo})` }}
                className={`${styles.excursionImage} bg-cover`}
            ></div>
            <div className={`${styles.excursionContent} f-column-betw`}>
                <div className={`${styles.excursionTextContent} f-column gap-5`}>
                    <h3 className={styles.excursionTitle}>{props.title}</h3>
                    <div className={styles.excursionType}>{props.ex_type.name}</div>
                    <p
                        className={`${styles.excursionDescription} ${props.descriptionHidden ? 'd-n' : ''
                            }`}
                    >
                        {props.description}
                    </p>
                </div>
                <div className="excursionDetailsContent f-column gap-20">
                    <div className="excursionDetails f-row-betw gap-10 flex-wrap">
                        <div className={`${styles.excursionDetailItem} d-f jc-start`}>
                            <MovementIcon strokeColor={'#D900B6'} />
                            <p>{props.transport.name}</p>
                        </div>
                        <div className={`${styles.excursionDetailItem} d-f jc-center`}>
                            <PeopleIcon strokeColor={'#D900B6'} />
                            <p>до {props.people_limit} чел</p>
                        </div>
                        <div className={`${styles.excursionDetailItem} d-f jc-end`}>
                            <ClockIcon strokeColor={'#D900B6'} />
                            <p>{formatMinutesToHours(props.duration)}</p>
                        </div>
                    </div>
                    {
                        !props.isGuideExcursion ? <div onClick={e => e.stopPropagation()} className={`${styles.buttons} f-row-betw`}>
                            <a href={`tel:${props.guide.phone}`}>
                                <UnfilledButton asBlock className={styles.writeGuide} title={'Связаться'} />
                            </a>
                            <div onClick={!isFavorite ? handleToFavorite : undefined} className={`${isFavorite ? styles.excursionInFavorites : null} ${styles.excursionFavoriteButton}`}>
                                <FavoriteIcon fill={isFavorite ? "#d900b6" : "none"} width={20} strokeColor={"#D900B6"} />
                                <p>{isFavorite ? "В Избранном" : "В избранное"}</p>
                            </div>
                        </div> : null
                    }

                    <div className="excursionInfo f-row-betw">
                        <div className={styles.excursionRating}>
                            <StarBordered strokeColor={'#D900B6'} />
                            <p>{props.rating || "Нет оценок"}</p>
                        </div>
                        <div className={styles.excursionPrice}>{props.cost || 0} ₽</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExcursionCard;
