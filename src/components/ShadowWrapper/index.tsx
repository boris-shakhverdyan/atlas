import { FC } from 'react';
import styles from './shadowWrapper.module.scss';
import { Clickable, HasChildrenProps } from '../../types/components.types';

const ShadowWrapper: FC<HasChildrenProps & Clickable> = ({ children, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`${styles.shadowContainer} h-100v w-100v p-fix top-0 left-0 f-c-col`}
        >
            {children}
        </div>
    );
};

export default ShadowWrapper;
