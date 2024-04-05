import React, {FC} from 'react';
import styles from './widgetButton.module.scss'
import {MessengerIcon} from "../../../icons";
import CountBlock from "../../CountBlock";
interface MessengerWidgetButton {
    toggleOpen: () => void
}
const MessengerWidgetButton: FC<MessengerWidgetButton> = ({toggleOpen}) => {
    return (
        <div onClick={toggleOpen} className={`${styles.widget} f-c-col`}>
            <div className="p-rel">
                <MessengerIcon width={34} height={34} />
                <CountBlock value={14} className={styles.count}/>
            </div>

        </div>
    );
};

export default MessengerWidgetButton;