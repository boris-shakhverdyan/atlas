import { FC } from 'react';
import List from '../../List';
import styles from './tagsSection.module.scss';
import UnfilledButton from '../../Buttons/UnfilledButton';
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import MobileTags from "./mobile";
import { CategoryApi } from '../../../types/categories.types.';
import { setCategory } from '../../../features/search/searchSlice';
import { useNavigate } from 'react-router-dom';

interface TagsSectionProps {
    titleIsHidden?: boolean;
    tags?: CategoryApi[]
}

const TagsSection: FC<TagsSectionProps> = ({ titleIsHidden = false, tags = [] }) => {
    const { isMobile } = useAppSelector(state => state.main)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    if (isMobile) {
        return <MobileTags tags={tags} />
    }

    const toSearchByCategory = (tagId: number) => {
        console.log(tagId);
        
        dispatch(setCategory(tagId))
        navigate("/search")
    }

    return (
        <section className={`tagsSection`}>
            <div className="wrapper">
                <div className="tagsBlock sectionBlock f-column">
                    {titleIsHidden ? null : <h2 className="section-title">Рекомендуем</h2>}
                    {
                        tags.length > 0 ?
                            <List
                                listBlockClassname={`${styles.tagsList} d-f flex-wrap gap-10`}
                                list={tags}
                                renderItem={(tag) => <UnfilledButton onClick={() => toSearchByCategory(tag.id)} title={tag.name} />}
                            /> : <div className="emptySection">
                                <p className="emptyText">Категории не найдены.</p>
                            </div>
                    }

                </div>
            </div>
        </section>
    );
};

export default TagsSection;
