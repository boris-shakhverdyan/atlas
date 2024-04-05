import { FC } from 'react';
import styles from './feature.module.scss';

interface FeatureProps {
    title: string;
    Icon: FC;
    description: string;
}
const Feature: FC<FeatureProps> = ({ title, description, Icon }) => {
    return (
        <div className={`${styles.featureItem} d-f gap-20 jc-between`}>
            <Icon />
            <div className={`${styles.featureText} f-column gap-15`}>
                <div className={`${styles.featureTitle}`}>{title}</div>
                <div className={`${styles.featureDescription}`}>{description}</div>
            </div>
        </div>
    );
};

export default Feature;
