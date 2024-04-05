import { FC } from 'react';
import { HasChildrenProps, HasClassName } from '../../types/components.types';
import styles from './baseLayout.module.scss';

const BaseLayout: FC<HasChildrenProps & HasClassName> = ({ children, className }) => {
    return <div className={`${className || null} ${styles.base}`}>{children}</div>;
};

export default BaseLayout;
