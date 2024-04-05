import { FC, ReactNode } from 'react';
import { CloseIcon } from '../../icons';
import styles from './excursionsPage.module.scss';
import ExcursionCard from '../../components/Cards/ExcursionCard';
import List from '../../components/List';
import BackLink from '../../components/BackLink';
import BaseLayout from '../BaseLayout';
import { ExcursionProps } from '../../types/excursions.types';

interface ExcursionsLayoutProps {
    backLinkText: string;
    emptyText: string;
    sectionTitle: string;
    beforeExcursions?: ReactNode;
    countText: string;
    excursions: ExcursionProps[];
    onDelete?: (id: number) => any;
}

const ExcursionsLayout: FC<ExcursionsLayoutProps> = ({
    sectionTitle,
    backLinkText,
    beforeExcursions,
    emptyText,
    excursions,
    onDelete,
    countText,
}) => {
    // const dispatch = useAppDispatch();
    return (
        <BaseLayout className={`f-column gap-30`}>
            <BackLink backLinkText={backLinkText} />
            <div className="content f-column gap-50">
                <div className="top f-row-betw flex-wrap gap-20">
                    <h2 className="section-title blured-entrance">{sectionTitle}</h2>
                    {excursions.length ? (
                        <div className={styles.count}>
                            {countText}: {excursions.length}
                        </div>
                    ) : null}
                </div>
                <>
                    {beforeExcursions}
                    {excursions.length ? (
                        <List
                            listBlockClassname={`d-f flex-wrap ${styles.excursionsLayoutList}`}
                            list={excursions}
                            renderItem={(item) => {
                                return (
                                    <div className="p-rel">
                                        {onDelete ? (
                                            <div
                                                onClick={() => onDelete(item.id)}
                                                className={`${styles.delete} hover-scale circle p-abs f-c-col bx-shadow`}
                                            >
                                                <CloseIcon />
                                            </div>
                                        ) : null}
                                        <ExcursionCard {...item} />
                                    </div>
                                );
                            }}
                        />
                    ) : (
                        <div className={'emptyText'}>{emptyText}</div>
                    )}
                </>
            </div>
        </BaseLayout>
    );
};

export default ExcursionsLayout;
