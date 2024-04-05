import { FC } from 'react';
import styles from './popularCity.module.scss';
import { Link } from 'react-router-dom';
import { CityCardProps } from '../../../types/cities.types';

const PopularCity: FC<CityCardProps> = (props) => {

    return (
        <Link className={`${styles.popularCity} f-column gap-10`} to={`/city/${props.id}`}>
            <div
                style={{ backgroundImage: `url(${props.main_photo})` }}
                className={`${styles.popularCityImage} bg-cover`}
            ></div>
            <div className={`${styles.popularCityInfo} f-column gap-20`}>
                <h3 className={`${styles.popularCityTitle}`}>{props.name}</h3>
                <div className={`${styles.popularCityDetails} f-row-betw`}>
                    <div className={styles.popularCityCount}>{props.num_excursions} экскурсий</div>
                    <div className={styles.popularCityPrice}>от {props.city_min_price || 0} ₽</div>
                </div>
            </div>
        </Link>
    );
};

export default PopularCity;
