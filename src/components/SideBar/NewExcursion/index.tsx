import { FC } from 'react';
import styles from '../sidebar.module.scss';
import styleNewExcursion from './newExcursion.module.scss';

interface NewExcursionBarProps {
    tabs: Array<{ name: string }>;
    currentTab?: number;
    setCurrentTab: (tabIndex: number) => void;
}
const NewExcursionBar: FC<NewExcursionBarProps> = ({ tabs, setCurrentTab, currentTab }) => {
    return (
        <div className={`f-column-betw gap-20 ${styleNewExcursion.sidebar} h-100p`}>
            <div className={`${styles.tabs} f-column gap-20 `}>
                {tabs.map((tab, index) => (
                    <div
                        onClick={() => (index !== currentTab ? setCurrentTab(index) : {})}
                        className={`${styles.item} ${index === currentTab ? styles.itemActive : ''}`}
                    >
                        {tab.name}
                    </div>
                ))}
            </div>
            {/*<UnfilledButton className={`w-100p d-f ${styleNewExcursion.createBtn}`} title={"Создать"}/>*/}
        </div>
    );
};

export default NewExcursionBar;
