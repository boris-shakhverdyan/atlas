import { FC } from 'react';
import styles from './inputField.module.scss';
import { HasChildrenProps, HasClassName, TextFieldProps } from '../../../types/components.types';

interface InputFieldProps {
    onClick?: () => void;
    wrapperClass?: string;
}

const InputField: FC<HasClassName & HasChildrenProps & TextFieldProps & InputFieldProps> = ({
    className,
    onClick,
    wrapperClass,
    children,
    mistake,
    fieldName,
}) => {
    if (onClick) {
        return (
            <div className={`${styles.field} ${className} f-column gap-5`}>
                {fieldName !== '' ? <label>{fieldName}</label> : null}
                <div
                    onClick={onClick}
                    className={`${styles.wrapper} ${wrapperClass} ${
                        mistake?.length ? styles.isIncorrect : ''
                    } p-rel bg-white d-f`}
                >
                    {mistake ? (
                        <div className={`p-abs ${styles.incorrectBlock} f-c-col`}>
                            <p className={styles.incorrect}>{mistake}</p>
                        </div>
                    ) : null}
                    {children}
                </div>
            </div>
        );
    }
    return (
        <div className={`${styles.field} ${className} f-column gap-5`}>
            <label>{fieldName}</label>
            <div
                className={`${styles.wrapper} ${wrapperClass} ${
                    mistake?.length ? styles.isIncorrect : ''
                } p-rel bg-white d-f`}
            >
                {mistake ? (
                    <div className={`p-abs ${styles.incorrectBlock} f-c-col`}>
                        <p className={styles.incorrect}>{mistake}</p>
                    </div>
                ) : null}
                {children}
            </div>
        </div>
    );
};

export default InputField;
