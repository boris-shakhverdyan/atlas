import { createContext, FC, ReactNode, useCallback, useState } from 'react';
import BaseLayout from '../BaseLayout';
import BackLink from '../../components/BackLink';
import styles from './sidePartLayout.module.scss';
import { HasChildrenProps } from '../../types/components.types';
import SideBarArea from '../../components/SideBar/Area';

interface SidePartLayoutProps {
    isProfileTabs?: boolean;
    defaultTitle?: string;
    backText?: string;
    tabsContent?: ReactNode;
    afterContent?: ReactNode;
    backLink?: string;
}

export type SidePartCTXType = {
    setTitle: (val: string) => void;
};
export const SidePartContext = createContext<SidePartCTXType>({
    setTitle: (val) => {},
});
const SidePartLayout: FC<SidePartLayoutProps & HasChildrenProps> = ({
    children,
    backLink = '/',
    defaultTitle,
    afterContent,
    backText,
    tabsContent,
}) => {
    const [pageTitle, setPageTitle] = useState<string>(defaultTitle || 'Личный кабинет');

    const handlePageTitle = useCallback((val: any) => {
        setPageTitle(val);
    }, []);
    return (
        <SidePartContext.Provider value={{ setTitle: handlePageTitle }}>
            <BaseLayout>
                <div className="wrapper">
                    <div className="profileLayout gap-30 f-column">
                        <BackLink linkTo={backLink} backLinkText={backText || 'На главную'} />
                        <div className="profileContent f-column gap-50">
                            <div className="f-column gap-20">
                                <h2 className="section-title blured-entrance">{pageTitle}</h2>
                            </div>
                            {afterContent}
                            <div className={`${styles.profileArea} d-f jc-between gap-50`}>
                                <SideBarArea>{tabsContent}</SideBarArea>
                                <div className={styles.areaContent}>{children}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </BaseLayout>
        </SidePartContext.Provider>
    );
};

export default SidePartLayout;
