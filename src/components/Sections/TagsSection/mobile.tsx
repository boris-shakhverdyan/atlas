import { FC } from 'react';
import styles from './tagsSection.module.scss';
import List from '../../List';
import UnfilledButton from '../../Buttons/UnfilledButton';
import WhiteButton from '../../Buttons/WhiteButton';
import { handleSelection } from '../../../features/modals/modalsSlice';
import { useAppDispatch } from '../../../app/hooks';
import { CategoryApi } from '../../../types/categories.types.';
import { chunkedArray } from '../../../utils/chunksArr';

type MobileTagsProps = {
    tags?: CategoryApi[];
};
const MobileTags: FC<MobileTagsProps> = ({ tags }) => {
    const dispatch = useAppDispatch();
    return (
        <section className={`tagsSection`}>
            <div className="wrapper">
                <div className="tagsBlock f-column gap-40">
                    <div className="f-column sectionBlock">
                        <h2 className="section-title ">Также рекомендуем</h2>
                        <div className="f-column gap-40">
                            {/* <div className={`${styles.tagsCategories} of-x-auto gap-20 d-f al-center`}>
                                <div
                                    className={`d-f gap-5 ${styles.tagCategory} ${styles.tagCategoryActive} selected-underline`}>
                                    <p>Категории</p>
                                </div>

                            </div> */}
                            <div className={`of-x-auto ${styles.mobileTags} d-f gap-15`}>
                                {chunkedArray<CategoryApi>(tags || [], 2)?.map((item) => (
                                    <List
                                        listBlockClassname={`f-column gap-15`}
                                        list={item}
                                        renderItem={(rItem) => (
                                            <UnfilledButton
                                                key={rItem.id}
                                                className={styles.tagItem}
                                                title={rItem.name}
                                            />
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={styles.popularExcursionChoose}>
                        <WhiteButton
                            className={styles.excursionChooseBtn}
                            onClick={() => dispatch(handleSelection())}
                        >
                            Подобрать экскурсию
                        </WhiteButton>
                        <h3>Подбери экскурсию своей мечты за 5 минут!</h3>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MobileTags;
