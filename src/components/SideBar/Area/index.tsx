import React, {FC} from 'react';
import styles from "./sidebar.module.scss";
import {HasChildrenProps} from "../../../types/components.types";

const SideBarArea: FC<HasChildrenProps> = ({
    children
}) => {
    return (
        <div className={`${styles.sidebar} pd-30 f-column-betw`}>
            {children}
        </div>
    );
};

export default React.memo(SideBarArea);