import { useRef, useState, useEffect } from 'react';
import SectionsArea from '../../components/SectionsArea';
import { FilterSearchIcon, SearchIcon } from '../../icons';
import styles from './search.module.scss';
import ExcursionCard from '../../components/Cards/ExcursionCard';
import List from '../../components/List';
import BackLink from '../../components/BackLink';
import SelectDropDown from '../../components/Dropdowns/Select';
import BaseLayout from '../../layouts/BaseLayout';
import { useInput } from '../../hooks/useInput';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
    getSearchedExcursions,
    setCategory,
    setSearch,
    setSearchCity,
    setSearchFilter,
} from '../../features/search/searchSlice';
import { filterVariants } from '../../features/search/filterVariants';
import { ExcursionProps } from '../../types/excursions.types';
import SelectInput from '../../components/SelectInput';
import { CustomSpinner } from '../../components/Preloader';

const Search = () => {
    const dispatch = useAppDispatch();
    const search = useAppSelector((state) => state.search);
    const { isMobile } = useAppSelector((state) => state.main);
    const [sortIsOpened, setSortIsOpened] = useState<boolean>(false);
    const [searchVal, changeSearchVal] = useInput(search.val);

    const filterBlockRef = useRef<HTMLDivElement>(null);

    const handleSortIsOpened = () => {
        setSortIsOpened(!sortIsOpened);
    };

    const handleSearch = () => {
        const valIsFilled = searchVal.length > 0;
        if (valIsFilled) {
            dispatch(setSearch(searchVal));
        }
    };

    const handleClickOutside = (e: any) => {
        if (filterBlockRef.current && !filterBlockRef.current.contains(e.target)) {
            setSortIsOpened(false);
        }
    };

    const handleFilter = (current: number) => {
        dispatch(setSearchFilter(current));
        setSortIsOpened(false);
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        dispatch(
            getSearchedExcursions({
                ordering: filterVariants.find((item) => item.id === search.filterVariant)?.type,
                search: search.val.length > 0 ? search.val : undefined,
                categories: search.category !== 0 ? String(search.category) : undefined,
                city: search.city !== 0 ? String(search.city) : undefined,
            }),
        );
    }, [search.category, search.val, search.filterVariant, search.city, dispatch]);

    return (
        <BaseLayout>
            <SectionsArea>
                <section className={styles.searchSection}>
                    <div className="wrapper">
                        <div className="searchBlock f-column gap-30">
                            <BackLink backLinkText={'На главную'} />
                            <div className="f-column sectionBlock">
                                <h2 className="section-title blured-entrance">
                                    Найдите экскурсию мечты!
                                </h2>
                                <div
                                    className={`${styles.searchPageTop} f-row-betw flex-wrap gap-20`}
                                >
                                    <div
                                        className={`${styles.searchLeft} d-f al-center gap-60 flex-wrap f-1 w-100p`}
                                    >
                                        <div
                                            className={`d-f al-center gap-20 flex-wrap w-100p ${styles.searchInputs}`}
                                        >
                                            <div
                                                className={`${styles.searchWrapper} gap-30 f-row-betw`}
                                            >
                                                <input
                                                    placeholder={'Какую экскурсию хотите?'}
                                                    className="f-1"
                                                    value={searchVal}
                                                    onChange={changeSearchVal}
                                                    type="text"
                                                />
                                                <div
                                                    onClick={handleSearch}
                                                    className="f-c-col w-content"
                                                >
                                                    <SearchIcon
                                                        strokeColor={'#D900B6'}
                                                        height={28}
                                                        width={28}
                                                    />
                                                </div>
                                            </div>
                                            <SelectInput
                                                defaultText={'Все категории'}
                                                classNameRefBlock={styles.searchCategoryWrapper}
                                                className={styles.searchCategoryInput}
                                                current={
                                                    search.category ||
                                                    (search.categoriesResults.length > 0
                                                        ? search.categoriesResults[0].id
                                                        : 0)
                                                }
                                                items={[
                                                    { id: 0, name: 'Все категории' },
                                                    ...search.categoriesResults,
                                                ]}
                                                selectHandler={(ctgId) =>
                                                    dispatch(setCategory(ctgId))
                                                }
                                            />
                                            <SelectInput
                                                defaultText={'Все города'}
                                                classNameRefBlock={styles.searchCategoryWrapper}
                                                className={styles.searchCityInput}
                                                current={
                                                    search.allCities.length > 0
                                                        ? search.allCities[0].id
                                                        : 0
                                                }
                                                items={[
                                                    { id: 0, name: 'Все города' },
                                                    ...search.allCities,
                                                ]}
                                                selectHandler={(cityId) =>
                                                    dispatch(setSearchCity(cityId))
                                                }
                                            />

                                            <div
                                                ref={filterBlockRef}
                                                className={`${styles.filter} p-rel`}
                                            >
                                                <div
                                                    onClick={handleSortIsOpened}
                                                    className={'cur-pointer d-f al-center gap-10'}
                                                >
                                                    <FilterSearchIcon width={30} height={30} />
                                                    <p>
                                                        {
                                                            filterVariants.find(
                                                                (item) =>
                                                                    item.id ===
                                                                    search.filterVariant,
                                                            )?.name
                                                        }
                                                    </p>
                                                </div>
                                                <SelectDropDown
                                                    current={search.filterVariant}
                                                    selectHandler={(current) =>
                                                        handleFilter(current)
                                                    }
                                                    className={`${
                                                        sortIsOpened
                                                            ? styles.searchFilterOpened
                                                            : styles.searchFilterIdle
                                                    } t-opacity-visible-transform-3`}
                                                    items={filterVariants}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <p className={styles.finded}>
                                        Найдено: {search.results.length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="excursionsSection">
                    <div className="wrapper">
                        <div className="excursionsBlock sectionBlock f-column">
                            <h2 className="section-title">Результаты поиска:</h2>
                            {search.loadings.excursions ? (
                                <CustomSpinner height={140} width={140} />
                            ) : search.results.length ? (
                                <List
                                    listBlockClassname={`d-f flex-wrap ${styles.excursionsLayoutList}`}
                                    listItemClassname={isMobile ? 'w-100p' : undefined}
                                    list={search.results}
                                    renderItem={(ex) => {
                                        return (
                                            <ExcursionCard
                                                classNameMobile={styles.searchMobileCard}
                                                {...(ex as ExcursionProps)}
                                            />
                                        );
                                    }}
                                />
                            ) : (
                                <p className="emptyText">Экскурсий по вашему запросу не найдено.</p>
                            )}
                        </div>
                    </div>
                </section>
            </SectionsArea>
        </BaseLayout>
    );
};

export default Search;
