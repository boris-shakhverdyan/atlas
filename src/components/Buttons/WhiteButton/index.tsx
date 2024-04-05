import { FC, ReactNode } from 'react';
import styles from './whiteButton.module.scss';
import {HasChildrenProps, HasClassName} from '../../../types/components.types';

interface WhiteButtonProps extends HasChildrenProps {
    children: ReactNode;
    onClick?: () => any
}
const WhiteButton: FC<WhiteButtonProps & HasClassName> = ({ children, onClick, className }) => {
    return <div onClick={onClick} className={`${styles.whiteButton} ${className || ""}`}>{children}</div>;
};

export default WhiteButton;
