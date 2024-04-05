import { FC } from 'react';
import { HasChildrenProps, HasClassName } from '../../../types/components.types';
import styles from './modalBody.module.scss';
const ModalBody: FC<HasChildrenProps & HasClassName> = ({ children, className }) => {
    return (
        <div
            onClick={(event) => event.stopPropagation()}
            className={`${className || ''} ${
                styles.modalBody
            }  bg-white pd-40 f-column gap-35 p-rel`}
        >
            {children}
        </div>
    );
};

export default ModalBody;
