import { FC } from 'react';
import styles from "../sidebar.module.scss";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { UserData } from "../../../types/user.types";
import { useLogout } from '../../../hooks/useLogout';

export type SideBarTab = {
    path: string,
    title: string
    enumCount?: number
}
interface SideBarProfileProps {
    currentTab: string
}

const SideBarProfile: FC<SideBarProfileProps> = ({ currentTab }) => {
    const { is_gid } = useAppSelector<UserData>(state => state.profile.data)
    const favorites = useAppSelector(state => state.favorites.items)
    const handleLogout = useLogout()
   
    const tabs: SideBarTab[] =
        is_gid ?
            [
                {
                    title: "Личные данные",
                    path: "/profile",
                },
                {
                    title: "История заказов",
                    path: "/profile/history",
                },
                {
                    title: "Мои экскурсии",
                    path: "/profile/guide/excursions",
                },
                {
                    title: "Избранное",
                    path: "/favorites",
                    enumCount: favorites.length
                },
                {
                    title: "Просмотренные",
                    path: "/seen"
                }
            ] :
            [
                {
                    title: "Личные данные",
                    path: "/profile",
                },
                {
                    title: "История заказов",
                    path: "/profile/history",
                },
                {
                    title: "Избранное",
                    path: "/favorites",
                    enumCount: 13
                },
                {
                    title: "Просмотренные",
                    path: "/seen"
                }
            ]

    return (
        <>
            <div className={`${styles.tabs} f-column gap-20`}>
                {
                    tabs.map((tab) => (
                        <Link to={tab.path} className={`${styles.item} ${currentTab === tab.path && styles.itemActive}`}>
                            {tab.title} &nbsp;
                            {tab.enumCount ? <b className="fw-6">{tab.enumCount}</b> : null}
                        </Link>
                    ))
                }
            </div>
            <div>
                <p onClick={handleLogout} className={styles.logout}>
                    Выход
                </p>

            </div>
        </>


    );
};

export default SideBarProfile;