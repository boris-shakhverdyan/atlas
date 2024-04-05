import { FC } from 'react';
import styles from './filledButton.module.scss';
import {HasClassName} from "../../../types/components.types";

interface FilledButtonProps {
    title: string;
    disabled?: boolean,
    clickHandle?: () => void

}
const FilledButton: FC<FilledButtonProps & HasClassName> = ({ title, clickHandle, disabled, className }) => {
    return (
        <button onClick={clickHandle} disabled={disabled} className={`${styles.filledButton} ${className || null}`}>{title}</button>
    );
};

export default FilledButton;
