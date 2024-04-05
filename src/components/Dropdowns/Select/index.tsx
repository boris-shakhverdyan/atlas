import React, { FC } from 'react';
import styles from "./select.module.scss";
import { HasClassName } from "../../../types/components.types";
import { TickIcon } from '../../../icons';

interface DropDownItemProps {
    isCurrent: boolean,
    text: string,
    selectHandler: () => void
}

interface SelectDropDownProps {
    items: Array<any>,
    textFieldName?: string,
    current: number,
    classNameItem?: string,
    selectHandler: (current: number) => void
}
const DropDownItem: FC<DropDownItemProps & HasClassName> = ({ isCurrent, className, text, selectHandler }) => {
    return (
        <div onClick={selectHandler} className={`cur-pointer f-row-betw gap-20 ${className} ${styles.item} ${isCurrent ? styles.selected : ""}`}>
            {text}
            {
                isCurrent ? <TickIcon width={12} height={8} /> : null
            }

        </div>
    )
}
const SelectDropDown: FC<SelectDropDownProps & HasClassName> = ({ items, current, selectHandler, className, textFieldName = "name" }) => {
    return (
        <div className={`${styles.filterSelect} ${className || ""} f-column gap-10 p-abs bg-white`}>
            {items.map((item) => <DropDownItem selectHandler={() => selectHandler(item.id)} text={item[textFieldName]} isCurrent={current === item.id} />)}
        </div>
    );
};



export default SelectDropDown;