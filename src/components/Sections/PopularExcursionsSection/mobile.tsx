import { FC, useEffect, useState } from 'react';
import styles from './excursionSection.module.scss';
import ExcursionCard from "../../Cards/ExcursionCard";
import { useAppSelector } from '../../../app/hooks';
import { ExcursionApi } from '../../../types/excursions.types';
import { chunkedArray } from '../../../utils/chunksArr';
import { CustomSpinner } from '../../Preloader';
import { ExcursionServiceApi } from '../../../http/api/excursion.api';

interface PopularExcursionsProps {
    isSlider?: boolean;
}

const EXS_CHUNK_LENGTH = 2

const PopularExcursionsMobile: FC<PopularExcursionsProps> = () => {
    const { popularCities } = useAppSelector(state => state.mainData)

    const [selectedCity, setSelectedCity] = useState(popularCities.length ? popularCities[0].id : -1)
    const [excursionsByCity, setExcursionsByCity] = useState<ExcursionApi[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const selectedCityDefined = selectedCity !== -1 && selectedCity !== 0
        const getSearchExcursions = async () => {
            setLoading(true)
            try {
                const res = await ExcursionServiceApi.Get({
                    city: String(selectedCity)
                })
                if (res.data) {
                    setExcursionsByCity(res.data)
                }
            } catch (error) {
    
            } finally {
                setLoading(false)
            }
        }

        if (selectedCityDefined) {
            (() => {
                getSearchExcursions()
            })()
        }
    }, [selectedCity])

    return (
        <section className={`popularExcursionsMobile`}>
            <div className="wrapper">
                <div className="popularExcursionsBlock f-column gap-40">
                    <div className="f-column sectionBlock">
                        <h2 className="section-title">Популярные экскурсии</h2>
                        <div className={`${styles.popularPlaces} of-x-auto gap-25 d-f al-center`}>
                            {
                                popularCities.map(item => (
                                    <div onClick={() => setSelectedCity(item.id)} key={item.id} className={`d-f gap-5 ${styles.placeItem} ${selectedCity === item.id ? `${styles.placeItemActive} selected-underline` : ""}`}>
                                        <div style={{ backgroundImage: `url(${item.main_photo})` }} className={styles.placeImg}></div>
                                        <p className={styles.placeName}>{item.name}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className={`${styles.mobileExcrusionsList} of-x-auto gap-30 d-f`}>

                        {
                            loading ?
                                <div className="d-f jc-center">
                                    <CustomSpinner height={50} width={50} />
                                </div>
                                :
                                excursionsByCity.length ?
                                    chunkedArray<ExcursionApi>(excursionsByCity, EXS_CHUNK_LENGTH).map(ex_Chunk => (
                                        <div className={`f-column gap-20 ${excursionsByCity.length <= EXS_CHUNK_LENGTH ? "w-100p" : ""}`}>
                                            {ex_Chunk.map(item => (
                                                <ExcursionCard
                                                    classNameMobile={excursionsByCity.length <= EXS_CHUNK_LENGTH ? styles.excursionByCityItem : ""}
                                                    {...item}
                                                />
                                            ))}

                                        </div>
                                    ))
                                    : <p className={styles.emptyText}>Здесь пока пусто.</p>
                        }

                    </div>


                </div>
            </div>
        </section>
    );
};

export default PopularExcursionsMobile;
