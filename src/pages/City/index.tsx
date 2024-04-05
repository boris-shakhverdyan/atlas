import { FC, useEffect } from 'react';
import styles from './city.module.scss';
import { BracketRight } from '../../icons';
import SectionsArea from '../../components/SectionsArea';
import { Link, Navigate, useParams } from 'react-router-dom';
import WelcomeLayout from '../../layouts/WelcomeLayout';
import FeaturesSection from '../../components/Sections/FeaturesSection';
import TagsSection from '../../components/Sections/TagsSection';
import PopularExcursionsSection from '../../components/Sections/PopularExcursionsSection';
import ReviewSections from '../../components/Sections/ReviewSections';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import PopularExcursionsMobile from '../../components/Sections/PopularExcursionsSection/mobile';
import { PagePreloader } from '../../components/PagePreloader';
import { getCity } from '../../features/city-page/cityPageSlice';

const City: FC = () => {
    const dispatch = useAppDispatch();
    const params = useParams();
    const { isMobile } = useAppSelector((state) => state.main);
    const { city_data, reviews, categories, excursions, loadings, pageStatus } = useAppSelector(
        (state) => state.cityPageData,
    );

    const allLoaded = Object.values(loadings).every((item) => !item);

    useEffect(() => {
        const paramId = params?.id;
        const numberedId = Number(paramId);
        if (!isNaN(numberedId)) {
            //ЗАПРОС НА ИНФОРМАЦИЮ О КОНКРЕТНОЙ ЭКСКУРСИИ
            dispatch(getCity({ id: numberedId }));
            return;
        }
    }, [dispatch, params]);

    return (
        <>
            <SectionsArea>
                <>
                    {pageStatus.finded ? (
                        <>
                            <WelcomeLayout backgroundURL={`${city_data.main_photo}`}>
                                <div className="wrapper h-100p c-white p-rel ">
                                    <div
                                        className={`${styles.WelcomeBlock} h-100p f-column-betw al-center w-100p gap-40`}
                                    >
                                        <div className="hidden"></div>
                                        <h1 className="txt-center">
                                            Эксклюзивные экскурсии в городе {city_data.name}
                                        </h1>
                                        <div
                                            className={`${styles.breadCrumbs} al-center gap-20 d-f`}
                                        >
                                            <Link to={'/'}>Главная</Link>
                                            <BracketRight height={14} width={18} />
                                            <div>{city_data.name}</div>
                                        </div>
                                    </div>
                                </div>
                            </WelcomeLayout>
                            <FeaturesSection />
                            {!isMobile ? (
                                <>
                                    <TagsSection tags={categories} />
                                    <PopularExcursionsSection
                                        excursions={excursions}
                                        titleSection={`Экскурсии в городе ${city_data.name} от ${city_data.city_min_price} руб.`}
                                        isSlider={true}
                                    />
                                </>
                            ) : (
                                <>
                                    <PopularExcursionsMobile />
                                    <TagsSection tags={categories} />
                                </>
                            )}
                            <ReviewSections reviews={reviews} isSlider={true} />
                        </>
                    ) : pageStatus.finded === false ? (
                        <Navigate to={'/not-found'} />
                    ) : null}
                </>
            </SectionsArea>
            <PagePreloader loaded={allLoaded} />
        </>
    );
};

export default City;
