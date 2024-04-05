import { FC } from 'react';
import { HasChildrenProps } from '../../types/components.types';
import styles from './welcomeLayout.module.scss';
interface WelcomeLayoutProps extends HasChildrenProps {
    backgroundURL: string;
}
const WelcomeLayout: FC<WelcomeLayoutProps> = ({ backgroundURL, children }) => {
    return (
        <section
            style={{ backgroundImage: `url(${backgroundURL})` }}
            className={styles.WelcomeSection}
        >
            <div className="bg-shadow h-100p w-100p p-abs"></div>
            {children}
        </section>
    );
};

export default WelcomeLayout;
