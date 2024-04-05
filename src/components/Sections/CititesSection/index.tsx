import styles from './cititesSection.module.scss'
import List from '../../List';
import PopularCity from '../../Cards/PopularCity';
import { useAppSelector } from '../../../app/hooks';

const CitiesSection = () => {
    const { popularCities } = useAppSelector(state => state.mainData)
    return (
        <section className={`popularCitiesSection`}>
            <div className="wrapper">
                <div className="popularCitiesBlock sectionBlock f-column">
                    <h2 className="section-title">Популярные города</h2>
                    {
                        popularCities.length > 0 ?
                            <List
                                listBlockClassname={`${styles.popularCitiesItems} flex-wrap`}
                                list={popularCities}
                                renderItem={(city) => (
                                    <PopularCity
                                        {...city}
                                    />
                                )}
                            /> : 
                            <div className="emptySection">
                                <p className="emptyText">
                                    Города не заполнены.
                                </p>
                            </div>
                    }

                </div>
            </div>
        </section>
    );
};

export default CitiesSection;
