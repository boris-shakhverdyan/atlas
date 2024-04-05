import React, {FC} from 'react';
import {Link} from "react-router-dom";
import styles from "./backLink.module.scss";
import {BackIcon} from "../../icons";

interface BackLinkProps {
    backLinkText: string
    linkTo?: string
}
const BackLink: FC<BackLinkProps> = ({backLinkText, linkTo = "/"}) => {
    return (
        <Link className={styles.backLinkNode} to={linkTo}>
            <div className={`${styles.backLink} al-center gap-20 d-f`}>
                <BackIcon />
                {backLinkText}
            </div>
        </Link>
    );
};

export default BackLink;