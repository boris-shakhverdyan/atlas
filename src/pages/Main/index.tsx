import { FC, useEffect } from 'react';
import styles from './main.module.scss';
import { getImgPath } from '../../utils/getAssetsPath';
import { SearchIcon } from '../../icons';
import SectionsArea from '../../components/SectionsArea';
import { Link } from 'react-router-dom';
import WelcomeLayout from '../../layouts/WelcomeLayout';
import FeaturesSection from '../../components/Sections/FeaturesSection';
import CitiesSection from '../../components/Sections/CititesSection';
import TagsSection from '../../components/Sections/TagsSection';
import PopularExcursionsSection from '../../components/Sections/PopularExcursionsSection';
import ReviewSections from '../../components/Sections/ReviewSections';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import PopularExcursionsMobile from '../../components/Sections/PopularExcursionsSection/mobile';
import { PagePreloader } from '../../components/PagePreloader';
import {
    getPopularCategories,
    getPopularCities,
    getPopularExcursions,
    getPopularReviews,
} from '../../features/main-data/mainDataSlice';

const Main: FC = () => {
    const dispatch = useAppDispatch();
    const { isMobile } = useAppSelector((state) => state.main);
    const { popularCategories, popularReviews, loadings, popularExcursions } = useAppSelector(
        (state) => state.mainData,
    );

    const allLoaded = Object.values(loadings).every((item) => !item);

    useEffect(() => {
        dispatch(getPopularCities());
        dispatch(getPopularCategories());
        dispatch(getPopularExcursions());
        dispatch(getPopularReviews());
    }, [dispatch]);

    return (
        <>
            <SectionsArea>
                <WelcomeLayout backgroundURL={getImgPath('main_bg.jpg')}>
                    <div className="wrapper h-100p c-white p-rel">
                        <div className={`${styles.WelcomeBlock} h-100p f-c-col w-100p gap-40`}>
                            <h1 className="txt-center">Эксклюзивные экскурсии по любым городам</h1>
                            <p>Только проверенные гиды и безопасные экскурсии</p>
                            <Link
                                to={'/search'}
                                className={`${styles.WelcomeSearch} al-center d-f`}
                            >
                                <input readOnly={true} value={'Найти экскурсию'} type="text" />
                                <SearchIcon strokeColor={'white'} />
                            </Link>
                        </div>
                    </div>
                </WelcomeLayout>
                <FeaturesSection />
                {!isMobile ? (
                    <>
                        <CitiesSection />
                        <TagsSection tags={popularCategories} />
                        <PopularExcursionsSection excursions={popularExcursions} isSlider={true} />
                        <ReviewSections reviews={popularReviews} isSlider={true} />
                    </>
                ) : (
                    <>
                        {/* <CitiesSection /> */}
                        <PopularExcursionsMobile />
                        <TagsSection tags={popularCategories} />
                        <ReviewSections reviews={popularReviews} isSlider={true} />
                    </>
                )}
            </SectionsArea>
            <PagePreloader loaded={allLoaded} />
        </>
    );
};

export default Main;
