import { FC } from 'react';
import styles from './unfilledButton.module.scss';
import {HasClassName} from "../../../types/components.types";

interface UnfilledButtonProps {
    title: string;
    disabled?: boolean,
    asBlock?: boolean,
    onClick?: () => any

}
const UnfilledButton: FC<UnfilledButtonProps & HasClassName> = ({ title, onClick, className, disabled = false, asBlock = false }) => {
    return (
        !asBlock ?
        <button disabled={disabled} onClick={onClick} className={`${styles.tagBlock} ${className || null} f-c-col txt-center`}>{title}</button> : 
        <div onClick={onClick} className={`${styles.tagBlock} ${className || null} f-c-col txt-center`}>{title}</div>
    );
};

export default UnfilledButton;
