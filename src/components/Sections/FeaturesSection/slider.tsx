import Feature from '../../Cards/Feature';
import {FeatureExperience, FeatureGuide, FeaturePrices} from '../../../icons';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay} from 'swiper/modules';
const FeaturesSectionSlider = () => {
    return (

        <div className="block f-column sectionBlock">
            <h2 className="section-title">Почему мы?</h2>
            <Swiper
                className={"w-100p"}
                slidesPerView={1}
                spaceBetween={"20"}
                loop={true}
                modules={[Autoplay]}
                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                }}
            >
                <SwiperSlide>
                    <Feature
                        Icon={() => <FeaturePrices/>}
                        title={'Лучшие цены'}
                        description={'На нашем сервисе самые лучшие цены'}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Feature
                        Icon={() => <FeatureGuide/>}
                        title={'Опытные гиды'}
                        description={
                            'Наши опытные гиды сделают вашу экскурсию целым приключением'
                        }
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Feature
                        Icon={() => <FeatureExperience/>}
                        title={'10 лет опыта'}
                        description={'10 лет опыта проведения экскурсий'}
                    />
                </SwiperSlide>

            </Swiper>
        </div>


    );
};

export default FeaturesSectionSlider;
