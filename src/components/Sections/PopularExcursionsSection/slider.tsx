import { FC, useEffect, useRef, useState } from 'react';
import ExcursionCard from '../../Cards/ExcursionCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { SwiperProps } from 'swiper/swiper-react';
import styles from './excursionSection.module.scss';
import { useAppSelector } from '../../../app/hooks';
import { ExcursionProps } from '../../../types/excursions.types';

type ExcursionsSliderProps = {
    excursions: ExcursionProps[];
    sliderMargin: number;
    mbClassName?: string;
};

const ExcursionsSlider: FC<ExcursionsSliderProps> = ({ excursions, mbClassName, sliderMargin }) => {
    const sliderExcursionsRef = useRef<SwiperProps>(null) as any;
    const { isMobile } = useAppSelector((state) => state.main);
    const [disabledArrows, setDisabledArrows] = useState(true);

    const handleNext = () => {
        sliderExcursionsRef.current.swiper.slideNext();
    };

    const handlePrev = () => {
        sliderExcursionsRef?.current?.swiper?.slidePrev();
    };

    useEffect(() => {
        if (isMobile) {
            setDisabledArrows(excursions.length <= 1);
            return;
        }
        setDisabledArrows(excursions.length <= 3);
    }, [isMobile, excursions]);

    return (
        <div className={'p-rel'}>
            {!disabledArrows ? (
                <>
                    <div
                        className={`${styles.sliderBtnWrapper} ${styles.sliderBtnLeft} f-c-col p-abs top-0`}
                    >
                        <svg
                            onClick={handlePrev}
                            className={'bx-shadow circle hover-scale'}
                            xmlns="http://www.w3.org/2000/svg"
                            width="49"
                            height="49"
                            viewBox="0 0 49 49"
                            fill="none"
                        >
                            <circle
                                cx="24.5"
                                cy="24.5"
                                r="24.5"
                                transform="rotate(180 24.5 24.5)"
                                fill="white"
                            />
                            <path
                                d="M19.4156 24.1431L19.0519 24.5L19.4156 24.8569L29.312 34.5682L28.6926 35.2731L17.7139 24.5L28.6926 13.7269L29.312 14.4318L19.4156 24.1431Z"
                                fill="black"
                                stroke="#D900B6"
                            />
                        </svg>
                    </div>
                    <div
                        className={`${styles.sliderBtnWrapper}  ${styles.sliderBtnRight} f-c-col p-abs top-0`}
                    >
                        <svg
                            onClick={handleNext}
                            className={'bx-shadow circle hover-scale'}
                            xmlns="http://www.w3.org/2000/svg"
                            width="49"
                            height="49"
                            viewBox="0 0 49 49"
                            fill="none"
                        >
                            <circle cx="24.5" cy="24.5" r="24.5" fill="white" />
                            <path
                                d="M29.5844 24.8569L29.9481 24.5L29.5844 24.1431L19.688 14.4318L20.3074 13.7269L31.2861 24.5L20.3074 35.2731L19.688 34.5682L29.5844 24.8569Z"
                                fill="black"
                                stroke="#D900B6"
                            />
                        </svg>
                    </div>
                </>
            ) : null}

            <Swiper
                ref={sliderExcursionsRef}
                className={'w-100p'}
                slidesPerView={!isMobile ? 3 : 1}
                spaceBetween={sliderMargin}
            >
                {excursions.map((item) => (
                    <SwiperSlide>
                        <ExcursionCard classNameMobile={mbClassName} {...item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ExcursionsSlider;
