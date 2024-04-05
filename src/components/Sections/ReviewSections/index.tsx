import { FC, useEffect, useRef, useState } from 'react';
import List from '../../List';
import ReviewCard from '../../Cards/ReviewCard';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './tagsSection.module.scss';
import { SwiperProps } from 'swiper/swiper-react';
import { ReviewCardProps } from '../../../types/reviews.types';
import { useAppSelector } from '../../../app/hooks';

interface ReviewSectionsProps {
    isSlider?: boolean;
}
type ReviewsProps = {
    reviews: ReviewCardProps[];
};

export const ReviewsSlider: FC<ReviewsProps> = ({ reviews }) => {
    const sliderReviewsRef = useRef<SwiperProps>(null) as any;
    const { isMobile } = useAppSelector((state) => state.main);
    const [sliderNeeded, setSliderNeeded] = useState(false);

    useEffect(() => {
        if (isMobile) {
            setSliderNeeded(reviews.length > 1);
            return;
        }
        setSliderNeeded(reviews.length > 2);
    }, [isMobile, reviews]);

    const handleNext = () => {
        sliderReviewsRef.current.swiper.slideNext();
    };

    const handlePrev = () => {
        sliderReviewsRef.current.swiper.slidePrev();
    };
    return (
        <div className={'p-rel'}>
            {sliderNeeded ? (
                <>
                    <div
                        className={`${styles.sliderBtnWrapper} ${styles.sliderBtnLeft} hover-scale f-c-col p-abs top-0`}
                    >
                        <svg
                            onClick={handlePrev}
                            className={'bx-shadow circle'}
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
                        className={`${styles.sliderBtnWrapper}  ${styles.sliderBtnRight} hover-scale f-c-col p-abs top-0`}
                    >
                        <svg
                            onClick={handleNext}
                            className={'bx-shadow circle'}
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
                className={'w-100p'}
                slidesPerView={2}
                spaceBetween={'90'}
                ref={sliderReviewsRef}
                breakpoints={{
                    150: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    1050: {
                        slidesPerView: 2,
                        spaceBetween: 90,
                    },
                }}
            >
                {reviews.map((item) => {
                    return (
                        <SwiperSlide key={item.id}>
                            <ReviewCard {...item} />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};
const ReviewSections: FC<ReviewSectionsProps & ReviewsProps> = ({ isSlider, reviews }) => {
    const { isMobile } = useAppSelector((state) => state.main);
    const [sliderNeeded, setSliderNeeded] = useState(false);

    useEffect(() => {
        if (isMobile) {
            setSliderNeeded(reviews.length > 1);
            return;
        }
        setSliderNeeded(reviews.length > 2);
    }, [isMobile, reviews]);

    return (
        <section className={`reviewsSection`}>
            <div className="wrapper">
                <div className="reviewsBlock sectionBlock f-column">
                    <h2 className="section-title">Отзывы</h2>
                    {reviews.length > 0 ? (
                        !sliderNeeded ? (
                            <List
                                listBlockClassname={'f-row-betw'}
                                list={reviews}
                                renderItem={(review) => <ReviewCard {...review} />}
                            />
                        ) : (
                            <ReviewsSlider reviews={reviews} />
                        )
                    ) : (
                        <div className="emptySection">
                            <div className="emptyText">Отзывов пока нет.</div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ReviewSections;
