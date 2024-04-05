import { FC } from 'react';
import { HasChildrenProps } from '../../types/components.types';
import styles from './sectionsArea.module.scss';
const SectionsArea: FC<HasChildrenProps> = ({ children }) => {
    return <div className={styles.SectionsArea}>{children}</div>;
};

export default SectionsArea;
