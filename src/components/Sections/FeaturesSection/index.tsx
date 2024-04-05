import Feature from '../../Cards/Feature';
import { FeatureExperience, FeatureGuide, FeaturePrices } from '../../../icons';
import styles from './featuresSection.module.scss';
import FeaturesSectionSlider from './slider';
import { useAppSelector } from '../../../app/hooks';

const FeaturesSection = () => {
    const { isMobile } = useAppSelector((state) => state.main);
    return (
        <>
            {
                <section className={`${styles.featuresSection}`}>
                    {
                        <div className="wrapper">
                            {isMobile ? (
                                <FeaturesSectionSlider />
                            ) : (
                                <div className="featuresBlock sectionBlock f-column">
                                    <h2 className="section-title">Почему мы?</h2>
                                    <div
                                        className={`${styles.featuresItems} d-f jc-between flex-wrap`}
                                    >
                                        <Feature
                                            Icon={() => <FeaturePrices />}
                                            title={'Лучшие цены'}
                                            description={'На нашем сервисе самые лучшие цены'}
                                        />
                                        <Feature
                                            Icon={() => <FeatureGuide />}
                                            title={'Опытные гиды'}
                                            description={
                                                'Наши опытные гиды сделают вашу экскурсию целым приключением'
                                            }
                                        />
                                        <Feature
                                            Icon={() => <FeatureExperience />}
                                            title={'10 лет опыта'}
                                            description={'10 лет опыта проведения экскурсий'}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    }
                </section>
            }
        </>
    );
};

export default FeaturesSection;
