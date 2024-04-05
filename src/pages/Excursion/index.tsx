import { useEffect, useRef, useState } from 'react';
import SectionsArea from '../../components/SectionsArea';
import styles from './excursionPage.module.scss';
import { Link, useParams } from 'react-router-dom';
import {
    ArrowDownLongItem,
    ArrowLeft,
    ArrowRight,
    ArrowShortLeftIcon,
    ArrowShortRightIcon,
    AvatarDefaultIcon,
    BracketRight,
    ClockIcon,
    FavoriteIcon,
    MovementIcon,
    PeopleIcon,
    ShareIcon,
    StarBordered,
    SuccessGreenIcon,
} from '../../icons';
import UnfilledButton from '../../components/Buttons/UnfilledButton';
import WhiteButton from '../../components/Buttons/WhiteButton';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { ReviewsSlider } from '../../components/Sections/ReviewSections';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { handleOrder } from '../../features/modals/modalsSlice';
import { addToSeen } from '../../features/seen/seenSlice';
import OrderModal from '../../components/Modals/Order';
import {
    createReview,
    getExcursion,
    resetData,
} from '../../features/excursion-page/excursionPageSlice';
import { PagePreloader } from '../../components/PagePreloader';
import ExcursionsSlider from '../../components/Sections/PopularExcursionsSection/slider';
import useFavorites from '../../hooks/useFavorites';
import { MIN_REVIEW_COUNT } from '../../config/validation/forms.rules';
import { CustomSpinner } from '../../components/Preloader';
import useToken from '../../hooks/useToken';
import { formatMinutesToHours } from '../../utils/minutesToHoursString';

export const ReviewExcursionForm = () => {
    const dispatch = useAppDispatch();
    const token = useToken();
    const [reviewVal, setReviewVal] = useState('');
    const [stars, setStars] = useState(0);

    const { reviewForm, ex_data } = useAppSelector((state) => state.excursionPageData);
    const { data } = useAppSelector((state) => state.profile);

    const validReviewText = !(reviewVal.length < MIN_REVIEW_COUNT);
    const validReviewStars = stars > 0;
    const validReview = validReviewText && validReviewStars;

    const sendCreateReview = () => {
        if (token) {
            dispatch(
                createReview({
                    user: Number(data.id),
                    description: reviewVal,
                    excursion: ex_data.id,
                    stars,
                }),
            );
            return;
        }
    };

    return (
        <>
            <h3>Оставьте свой отзыв</h3>
            <form className={`${styles.reviewForm} f-column gap-30`} action="">
                <div className="f-column w-100p gap-10">
                    <textarea
                        placeholder={'Напишите текст отзыва'}
                        value={reviewVal}
                        onChange={(e) => setReviewVal(e.target.value)}
                    ></textarea>
                    {!validReviewText ? (
                        <p style={{ fontSize: 12 }} className={'errColor'}>
                            Минимум {MIN_REVIEW_COUNT} символов ({reviewVal.length}/
                            {MIN_REVIEW_COUNT})
                        </p>
                    ) : null}
                </div>
                <div className="d-f al-center gap-10">
                    {Array(5)
                        .fill('')
                        .map((item, index) => (
                            <div onClick={() => setStars(index + 1)} className={'cur-pointer'}>
                                <StarBordered
                                    height={30}
                                    width={30}
                                    fill={index + 1 > stars ? 'lightgray' : undefined}
                                />
                            </div>
                        ))}
                </div>
                <div className="d-f al-center gap-10">
                    <UnfilledButton
                        onClick={sendCreateReview}
                        disabled={!validReview || reviewForm.sending}
                        className={styles.button}
                        title={'Оставить отзыв'}
                    />
                    {reviewForm.sending ? <CustomSpinner width={16} height={16} /> : null}
                </div>
            </form>
        </>
    );
};

const Excursion = () => {
    const dispatch = useAppDispatch();
    // const navigate = useNavigate();
    const params = useParams();
    const paramId = params?.id;

    const sliderWelcomeRef = useRef<SwiperProps>() as any;
    const { similar, ex_data, loadings, photos, locations, reviews, reviewForm, pageStatus } =
        useAppSelector((state) => state.excursionPageData);
    const { order } = useAppSelector((state) => state.modals);
    const seen = useAppSelector((state) => state.seen);
    const { addToFavorites, removeFavorite, isFavorite } = useFavorites(ex_data.id);

    const [linkCopied, setLinkCopied] = useState<boolean | null>(null);

    const handleToFavorite = () => addToFavorites(ex_data);
    const handleDeleteFavorite = () => removeFavorite(ex_data.id);

    const handleNext = () => {
        sliderWelcomeRef.current.swiper.slideNext();
    };

    const handlePrev = () => {
        sliderWelcomeRef.current.swiper.slidePrev();
    };

    const handleOrderExcursion = () => {
        dispatch(handleOrder());
    };

    const resetLinkCopied = () => {
        setTimeout(() => {
            setLinkCopied(null);
        }, 2000);
    };

    async function copyExcursionLink() {
        try {
            const currentURL = window.location.href;
            await navigator.clipboard.writeText(currentURL);
            setLinkCopied(true);
            resetLinkCopied();
        } catch (err) {
            console.error('Failed to copy: ', err);
            setLinkCopied(false);
            resetLinkCopied();
        }
    }

    useEffect(() => {
        if (ex_data.id) {
            const alreadySeen = seen.items.some((item) => item.id === ex_data.id);
            if (!alreadySeen) {
                dispatch(addToSeen(ex_data));
            }
            return;
        }
    }, [ex_data, dispatch, seen]);

    useEffect(() => {
        const numberedId = Number(paramId);
        if (!isNaN(numberedId)) {
            if (numberedId > 0) {
                dispatch(getExcursion({ id: numberedId }));
            }
            return;
        }
    }, [paramId, dispatch]);

    useEffect(() => {
        return () => {
            dispatch(resetData());
        };
    }, [dispatch]);

    const allLoaded = Object.values(loadings).every((item) => !item);

    return (
        <SectionsArea>
            <div className="f-column gap-50 p-rel">
                <div className={'p-abs left-0 top-0'}>
                    <Swiper
                        ref={sliderWelcomeRef}
                        className={`${styles.slider} h-100p w-100v p-abs left-0`}
                        slidesPerView={1}
                    >
                        {photos.length === 0 ? (
                            <SwiperSlide>
                                <div
                                    style={{
                                        backgroundImage:
                                            ex_data.main_photo && pageStatus.finded
                                                ? `url(${ex_data.main_photo})`
                                                : undefined,
                                        backgroundColor:
                                            ex_data.main_photo && pageStatus.finded
                                                ? undefined
                                                : 'gray',
                                        backgroundPositionX: 'center',
                                        minHeight: 580,
                                    }}
                                    className="h-100p w-100p bg-cover f-c-col"
                                >
                                    <div className="bg-shadow h-100p w-100p p-abs bg-white"></div>
                                    <div className={`${styles.slideDescription} p-rel`}></div>
                                </div>
                            </SwiperSlide>
                        ) : (
                            photos.map((item) => (
                                <SwiperSlide>
                                    <div
                                        style={{
                                            backgroundImage: item.image
                                                ? `url(${item.image})`
                                                : undefined,
                                            backgroundPositionX: 'center',
                                            backgroundColor: item.image ? undefined : 'gray',
                                            minHeight: 580,
                                        }}
                                        className="h-100p w-100p bg-cover f-c-col"
                                    >
                                        <div className="bg-shadow h-100p w-100p p-abs bg-white"></div>
                                        <div className={`${styles.slideDescription} p-rel`}>
                                            {item.title}
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                        )}
                    </Swiper>
                </div>

                <section
                    style={{ backgroundImage: `url("dsds")` }}
                    className={`${styles.excursionWelcome} p-rel top-0 left-0`}
                >
                    {pageStatus.finded ? (
                        <div className="h-100p c-white p-rel left-0">
                            <div
                                className={`${styles.WelcomeBlock} h-100p f-column-betw al-center w-100p gap-40`}
                            >
                                <div className={'hidden d-n'}>{ex_data.title}</div>
                                <div className="wrapper">
                                    <div className={styles.welcomeExcursionTitle}>
                                        {ex_data.title}
                                    </div>
                                </div>

                                {photos.length > 1 ? (
                                    <div
                                        className={`${styles.sliderExcursion} pd-20 f-row-betw w-100p`}
                                    >
                                        <div
                                            className={`${styles.slideBtn} cur-pointer f-c-col`}
                                            onClick={handlePrev}
                                        >
                                            <ArrowShortLeftIcon height={16} width={16} />
                                        </div>
                                        <div
                                            className={`${styles.slideBtn}  cur-pointer f-c-col`}
                                            onClick={handleNext}
                                        >
                                            <ArrowShortRightIcon height={16} width={16} />
                                        </div>
                                    </div>
                                ) : null}

                                <div
                                    className={`${styles.excursionBottom} wrapper f-row-betw flex-wrap gap-20`}
                                >
                                    <div className={`${styles.breadCrumbs} al-center gap-20 d-f`}>
                                        {pageStatus.finded ? (
                                            <>
                                                <Link to={'/'}>Главная</Link>
                                                <BracketRight height={14} width={18} />
                                                <Link to={`/city/${ex_data.city.id}`}>
                                                    {ex_data.city.name}
                                                </Link>
                                                <BracketRight height={14} width={18} />
                                                <div>{ex_data.title}</div>
                                            </>
                                        ) : null}
                                    </div>
                                    {pageStatus.finded ? (
                                        <div className="f-row-betw w-100p">
                                            <div
                                                className={`${styles.excursionInfo} d-f al-center gap-50`}
                                            >
                                                <div
                                                    className={`${styles.rating} d-f al-center gap-15`}
                                                >
                                                    <StarBordered height={30} width={30} />
                                                    <p>{ex_data.rating || 'Нет оценок'}</p>
                                                </div>
                                                <div
                                                    onClick={
                                                        !isFavorite
                                                            ? handleToFavorite
                                                            : handleDeleteFavorite
                                                    }
                                                    className={`${styles.favoriteWrapper} d-f al-center gap-15`}
                                                >
                                                    <div className={styles.favoriteBtn}>
                                                        <FavoriteIcon
                                                            fill={isFavorite ? '#d900b6' : 'none'}
                                                            width={20}
                                                            strokeColor={'#D900B6'}
                                                        />
                                                    </div>

                                                    <p>
                                                        {isFavorite ? 'В Избранном' : 'В избранное'}
                                                    </p>
                                                </div>
                                            </div>
                                            {photos.length > 1 ? (
                                                <div
                                                    className={`${styles.sliderArrowsMobile} pd-20 d-f gap-10 `}
                                                >
                                                    <div
                                                        className={`${styles.slideBtn} cur-pointer f-c-col`}
                                                        onClick={handlePrev}
                                                    >
                                                        <ArrowShortLeftIcon
                                                            height={16}
                                                            width={16}
                                                        />
                                                    </div>
                                                    <div
                                                        className={`${styles.slideBtn}  cur-pointer f-c-col`}
                                                        onClick={handleNext}
                                                    >
                                                        <ArrowShortRightIcon
                                                            height={16}
                                                            width={16}
                                                        />
                                                    </div>
                                                </div>
                                            ) : null}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="f-c-col h-100p gap-30 pd-0-20">
                            <h1 style={{ fontSize: 32 }} className="c-white txt-center">
                                Экскурсия не найдена
                            </h1>
                            <Link to={'/'}>
                                <UnfilledButton title={'Вернуться на главную'} />
                            </Link>
                        </div>
                    )}
                </section>
            </div>
            {pageStatus.finded ? (
                <>
                    <section className={`d-n ${styles.excursionNavigation}`}>
                        <div className="wrapper">
                            <div className="block  f-row-betw">
                                <div
                                    className={`${styles.pageLink} cur-pointer gap-10 al-center d-f`}
                                >
                                    <ArrowLeft />
                                    <p>Предыдущая</p>
                                </div>
                                <div
                                    className={`${styles.pageLink} cur-pointer gap-10 al-center d-f`}
                                >
                                    <p>Следующая</p>
                                    <ArrowRight />
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className={styles.excursionSection}>
                        <div className={`${styles.wrapperExcursions} wrapper`}>
                            <div className={`${styles.block} f-column gap-50`}>
                                <div className={`${styles.top} gap-20 f-row-betw`}>
                                    <div className={styles.titleBlock}>
                                        <h2>{ex_data.title}</h2>
                                        <p>{ex_data.ex_type.name}</p>
                                    </div>
                                    <div
                                        className={`${styles.price} flex-wrap d-f al-center gap-20`}
                                    >
                                        <div className={`${styles.priceInfo} price f-column`}>
                                            <h3>{ex_data.cost} ₽</h3>
                                            <p>{ex_data.payment_type.name}</p>
                                        </div>
                                        <UnfilledButton
                                            onClick={handleOrderExcursion}
                                            className={styles.orderBtn}
                                            title={'Забронировать'}
                                        />
                                    </div>
                                </div>
                                <div className="f-row-betw gap-20 flex-wrap">
                                    <div
                                        className={`${styles.excursionFeature} d-f al-center gap-20`}
                                    >
                                        <MovementIcon height={35} width={35} />
                                        <p>{ex_data.transport.name}</p>
                                    </div>
                                    <div
                                        className={`${styles.excursionFeature} d-f al-center gap-20`}
                                    >
                                        <PeopleIcon height={35} width={35} />
                                        <p>до {ex_data.people_limit} чел.</p>
                                    </div>
                                    <div
                                        className={`${styles.excursionFeature} d-f al-center gap-20`}
                                    >
                                        <ClockIcon height={35} width={35} />
                                        <p>{formatMinutesToHours(ex_data.duration)}</p>
                                    </div>
                                    <div className={`${styles.age} d-f al-center `}>
                                        <h2>{ex_data.age_limit}</h2>+
                                    </div>
                                </div>
                                <div className={`${styles.infoBlock} f-column gap-70`}>
                                    <div className={`${styles.pointsBlock} f-column gap-40`}>
                                        <h2>{ex_data.slogan}</h2>
                                        <div className={`${styles.points} f-column gap-30`}>
                                            <div
                                                className={`${styles.paragraphBlock} f-column gap-15`}
                                            >
                                                <h3>Описание экскурсии</h3>
                                                <p>{ex_data.description}</p>
                                            </div>
                                            <div
                                                className={`${styles.paragraphBlock} f-column gap-15`}
                                            >
                                                <h3>О гиде</h3>
                                                <div className="f-column gap-20">
                                                    <div
                                                        className={`${styles.guideCard} d-f al-center gap-20`}
                                                    >
                                                        <div
                                                            style={{
                                                                backgroundImage: `url(${ex_data.guide.profile_photo})`,
                                                            }}
                                                            className={`${styles.avatar} bg-cover f-c-col`}
                                                        >
                                                            {ex_data.guide.profile_photo ===
                                                            null ? (
                                                                <AvatarDefaultIcon
                                                                    height={40}
                                                                    width={40}
                                                                />
                                                            ) : null}
                                                        </div>
                                                        <div className={styles.person}>
                                                            <div className="d-f al-center gap-15">
                                                                <div className={styles.name}>
                                                                    {ex_data.guide.first_name ||
                                                                        'Гид'}{' '}
                                                                    {ex_data.guide.last_name}
                                                                </div>
                                                                {/* <div
                                                              className={`${styles.rating} d-f al-center gap-10`}
                                                          >
                                                              <StarBordered />
                                                              <p>4.5</p>
                                                          </div> */}
                                                            </div>
                                                            {ex_data.guide.description.length ? (
                                                                <div className={styles.description}>
                                                                    {ex_data.guide.description}
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                    <a href={`tel:${ex_data.guide.phone}`}>
                                                        <WhiteButton
                                                            className={styles.messageGuide}
                                                        >
                                                            Позвонить гиду
                                                        </WhiteButton>
                                                    </a>
                                                </div>
                                            </div>
                                            <div
                                                className={`${styles.paragraphBlock} f-column gap-15`}
                                            >
                                                <h3>Что важно знать?</h3>
                                                <div
                                                    className={`${styles.listBlock} flex-column gap-10`}
                                                >
                                                    {ex_data.extra_details !== undefined &&
                                                    ex_data.extra_details.length > 0 ? (
                                                        ex_data?.extra_details.map(
                                                            (item, index) => (
                                                                <div
                                                                    key={index}
                                                                    className={`${styles.listItem} d-f gap-5`}
                                                                >
                                                                    {item.text}
                                                                </div>
                                                            ),
                                                        )
                                                    ) : (
                                                        <div className={styles.emptySection}>
                                                            <p className="emptyText">
                                                                Пункты не заполнены.
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div
                                                className={`${styles.paragraphBlock} f-column gap-15`}
                                            >
                                                <h3>Организационные детали</h3>
                                                <div
                                                    className={`${styles.listBlock} flex-column gap-10`}
                                                >
                                                    {ex_data.organizational_details !== undefined &&
                                                    ex_data.organizational_details.length > 0 ? (
                                                        ex_data?.organizational_details.map(
                                                            (item, index) => (
                                                                <div
                                                                    key={index}
                                                                    className={`${styles.listItem} d-f gap-5`}
                                                                >
                                                                    {item.text}
                                                                </div>
                                                            ),
                                                        )
                                                    ) : (
                                                        <div className={styles.emptySection}>
                                                            <p className="emptyText">
                                                                Пункты не заполнены.
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${styles.pointsBlock} f-column gap-40`}>
                                        <h2>Маршрут экскурсии</h2>
                                        <div className={`${styles.locations} f-column gap-10`}>
                                            {locations.length > 0 ? (
                                                locations.map((item, index) => (
                                                    <>
                                                        <div key={item.id} className={styles.item}>
                                                            <h3>
                                                                {index + 1}. {item.name}
                                                            </h3>
                                                        </div>
                                                        {index < locations.length - 1 ? (
                                                            <div className="self-center">
                                                                <ArrowDownLongItem />
                                                            </div>
                                                        ) : null}
                                                    </>
                                                ))
                                            ) : (
                                                <div className={styles.emptySection}>
                                                    <p className="emptyText">
                                                        Локации не заполнены.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className={`${styles.pointsBlock}  f-column gap-40`}>
                                        <h2>Отзывы</h2>

                                        <div className={`${styles.reviews} f-column gap-20`}>
                                            {reviews.length > 0 ? (
                                                <ReviewsSlider reviews={reviews} />
                                            ) : (
                                                <div className={styles.emptySection}>
                                                    <p className="emptyText">Отзывов пока нет.</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className={styles.points}>
                                            <div
                                                className={`${styles.paragraphBlock} f-column gap-15`}
                                            >
                                                {reviewForm.alreadySended ? (
                                                    <div className={'d-f al-center gap-20'}>
                                                        <SuccessGreenIcon height={40} width={40} />
                                                        <h3>Вы оставили свой отзыв!</h3>
                                                    </div>
                                                ) : (
                                                    <ReviewExcursionForm />
                                                )}
                                            </div>
                                        </div>
                                        <div className={`f-row-betw ${styles.priceBottom}`}>
                                            {linkCopied !== null ? (
                                                linkCopied ? (
                                                    <div className="d-f al-center gap-10">
                                                        <SuccessGreenIcon width={30} height={30} />
                                                        <p style={{ fontSize: 14 }}>
                                                            Ссылка скопирована
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <p style={{ fontSize: 14 }}>
                                                        Не удалось скопировать ссылку
                                                    </p>
                                                )
                                            ) : (
                                                <WhiteButton
                                                    onClick={copyExcursionLink}
                                                    className={styles.shareBtn}
                                                >
                                                    <div
                                                        className={`${styles.share} f-row-betw gap-10`}
                                                    >
                                                        <ShareIcon />
                                                        <p>Поделиться экскурсией</p>
                                                    </div>
                                                </WhiteButton>
                                            )}

                                            <div className={`${styles.price} d-f al-center gap-20`}>
                                                <div
                                                    className={`${styles.priceInfo} price f-column`}
                                                >
                                                    <h3>{ex_data.cost}₽</h3>
                                                    <p>{ex_data.payment_type.name}</p>
                                                </div>
                                                <UnfilledButton
                                                    onClick={handleOrderExcursion}
                                                    className={styles.orderBtn}
                                                    title={'Забронировать'}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${styles.pointsBlock} f-column gap-40`}>
                                        <h2>Похожие экскурсии</h2>
                                        {similar.length > 0 ? (
                                            <ExcursionsSlider
                                                mbClassName={styles.similarItem}
                                                sliderMargin={12}
                                                excursions={similar}
                                            />
                                        ) : (
                                            <div className={styles.emptySection}>
                                                <p className="emptyText">
                                                    Похожих экскурсий не найдено
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {order ? <OrderModal {...ex_data} /> : null}
                </>
            ) : null}

            <PagePreloader loaded={allLoaded} />
        </SectionsArea>
    );
};

export default Excursion;
