import React, {FC} from 'react';
import styles from './messengerArea.module.scss'
interface MessengerAreaProps {
    opened?: boolean
    toggleOpen: () => void
}
const MessengerArea: FC<MessengerAreaProps> = ({opened = false, toggleOpen}) => {
    return (
        <div className={`${styles.messengerBlock} ${opened ? styles.messengerIsOpened : null} pd-20 p-abs t-opacity-visible-3`}>
            <p onClick={toggleOpen}>Закрыть</p>
        </div>
    );
};

export default MessengerArea;