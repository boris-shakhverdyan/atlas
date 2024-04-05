import { FC, useEffect, useState } from 'react';
import List from '../../List';
import styles from '../../../pages/Main/main.module.scss';
import pageStyles from './excursionSection.module.scss'
import ExcursionCard from '../../Cards/ExcursionCard';
import WhiteButton from '../../Buttons/WhiteButton';
import ExcursionsSlider from './slider';
import { useAppDispatch } from "../../../app/hooks";
import { handleSelection } from "../../../features/modals/modalsSlice";
import { ExcursionApi, ExcursionProps } from '../../../types/excursions.types';

interface PopularExcursionsProps {
    isSlider?: boolean;
    titleSection?: string
    excursions?: ExcursionApi[]
}

const PopularExcursionsSection: FC<PopularExcursionsProps> = ({ isSlider = false, titleSection = "Популярные экскурсии", excursions = [] }) => {
    const dispatch = useAppDispatch()
    const [sliderNeeded, setSliderNeeded] = useState(isSlider)

    useEffect(() => {
        const isNeeded = excursions.length > 3
        setSliderNeeded(isNeeded)
    }, [excursions])

    return (
        <section className={`popularExcursionsSection`}>
            <div className="wrapper">
                <div className={`sectionBlock f-column`}>
                    <h2 className="section-title">{titleSection}</h2>
                    {
                        excursions.length > 0 ?
                            !sliderNeeded ? (
                                <List
                                    listBlockClassname={`d-f flex-wrap ${pageStyles.excursionsList}`}
                                    list={excursions}
                                    renderItem={(item) => (
                                        <ExcursionCard
                                            {...item as ExcursionProps}
                                        />
                                    )}
                                />
                            ) : (
                                <ExcursionsSlider excursions={excursions} sliderMargin={40} />
                            ) :
                            <div className="emptySection">
                                <p className="emptyText">
                                    Экскурсий не найдено.
                                </p>
                            </div>
                    }
                    <div className={styles.popularExcursionChoose}>
                        <WhiteButton className={styles.excursionChooseBtn} onClick={() => dispatch(handleSelection())}>Подобрать экскурсию</WhiteButton>
                        <h3>Подбери экскурсию своей мечты за 5 минут!</h3>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PopularExcursionsSection;
