import React, {useState} from 'react';
import styles from './messenger.module.scss'
import MessengerWidgetButton from "./WidgetButton/WidgetButton";
import MessengerArea from "./Area";
const Messenger = () => {
    const [isOpened, setIsOpened] = useState<boolean>(false)

    const handleIsOpened = () => setIsOpened(!isOpened)

    return (
        <div className={`${styles.container} p-fix`}>
            <div className="h-100p w-100p p-rel">
                <MessengerArea toggleOpen={handleIsOpened} opened={isOpened}/>
                <MessengerWidgetButton toggleOpen={handleIsOpened}/>
            </div>

        </div>
    );
};

export default Messenger;