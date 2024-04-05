import React, {FC} from 'react';
import styles from './countBlock.module.scss'

interface CountBlockProps {
    className?: string,
    value: number

}
const CountBlock: FC<CountBlockProps> = ({className, value}) => {
    return (
        <div className={`${styles.countBlock} ${className ? className : null} f-c-row`}>{value}</div>
    );
};

export default CountBlock;