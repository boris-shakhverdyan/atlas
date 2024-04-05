import { useEffect } from 'react';
import List from '../../../../components/List';
import ExcursionCard from '../../../../components/Cards/ExcursionCard';
import UnfilledButton from '../../../../components/Buttons/UnfilledButton';
import styles from './excursions.module.scss';
import useProfileLayoutTitle from '../../../../hooks/useProfileLayoutTitle';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import AcceptDeleteExcursion from '../../../../components/Modals/AcceptDeleteExcursion';
import { getGuideExcursions } from '../../../../features/guide/guideSlice';
import { CustomSpinner } from '../../../../components/Preloader';

const GuideExcursions = () => {
    const dispatch = useAppDispatch();
    const { excursions, loadings } = useAppSelector((state) => state.guide);
    const { acceptDelete } = useAppSelector((state) => state.modals);
    const { data } = useAppSelector((state) => state.profile);

    useProfileLayoutTitle('Ваши экскурсии');

    useEffect(() => {
        dispatch(getGuideExcursions({ guide_id: Number(data.id) }));
    }, [dispatch, data.id]);

    return (
        <>
            <div className={`d-f`}>
                <div className={`f-column gap-50 ${styles.guideExcursions}`}>
                    <Link
                        className={styles.guideExcursionsCreate}
                        to={'/guide/excursions/form/create'}
                    >
                        <UnfilledButton title={'Создать экскурсию'} />
                    </Link>
                    {!loadings.excursions ? (
                        excursions.length ? (
                            <List
                                listBlockClassname={'d-f  flex-wrap gap-60'}
                                list={excursions}
                                renderItem={(item) => (
                                    <ExcursionCard
                                        controls
                                        isGuideExcursion
                                        classNameMobile={styles.guideExcursionItem}
                                        {...item}
                                    />
                                )}
                            />
                        ) : (
                            <p className={'emptyText'}>
                                У вас нет созданных экскурсий. Создайте их.
                            </p>
                        )
                    ) : (
                        <div className={`d-f w-100p ${styles.historyLoader}`}>
                            <CustomSpinner height={140} width={140} />
                        </div>
                    )}
                </div>
            </div>
            {acceptDelete ? <AcceptDeleteExcursion /> : null}
        </>
    );
};

export default GuideExcursions;
