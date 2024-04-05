import { FC } from 'react';
import { CustomSpinner } from '../Preloader';
import styles from './pagePreloader.module.scss';

type PagePreloaderProps = {
    loaded: boolean;
};
export const PagePreloader: FC<PagePreloaderProps> = ({ loaded }) => {
    return (
        <div
            className={`p-fix f-c-col  ${loaded ? 'slide-out-top' : null} top-0 ${
                styles.pageLoader
            }`}
        >
            <CustomSpinner height={150} width={150} />
        </div>
    );
};
