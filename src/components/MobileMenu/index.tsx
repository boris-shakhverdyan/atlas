import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { handleLogin, setMenuMobile } from "../../features/modals/modalsSlice";
import useToken from '../../hooks/useToken';
import { AvatarDefaultIcon, FavoriteIcon, SeenIcon } from "../../icons";
import styles from './mobileMenu.module.scss';
import { useLogout } from '../../hooks/useLogout';
import { domain } from '../../http/instance';

const MobileMenu = () => {
    const dispatch = useAppDispatch()
    const token = useToken()
    
    const { menuMobile } = useAppSelector(state => state.modals)
    const { email, first_name, profile_photo } = useAppSelector(state => state.profile.data)

    const handleLogout = useLogout()

    const handleCloseMenu = () => {
        dispatch(setMenuMobile(false))
    }
    const openLogin = () => {
        handleCloseMenu()
        dispatch(handleLogin())
    }

    // const openChat = () => {
    //     handleCloseMenu()
    //     alert("Чат в разработке")
    // }

    return (
        <div onClick={handleCloseMenu}
            className={`p-fix top-0 ${styles.menuContainer} ${menuMobile ? styles.menuActive : ""} d-f jc-end w-100p t-transform-5 h-100v w-100v`}>
            <div onClick={e => e.stopPropagation()} className={styles.menu}>
                {
                    token ? <Link onClick={handleCloseMenu} to={"/profile"} className={`${styles.headerMenu} w-100p top pd-15 d-f al-center gap-10`}>
                        <div style={profile_photo ? { backgroundImage: `url(${domain}${profile_photo})` } : {}} className={`${styles.avatar} f-c-col bg-cover`}>
                        {!profile_photo ? <AvatarDefaultIcon height={30} width={30} /> : null}
                        </div>
                        <div className="f-column">
                            <div className={styles.name}>{first_name}</div>
                            <div className={styles.email}>{email}</div>
                        </div>
                    </Link > :
                        <div onClick={openLogin} className={`${styles.headerMenu} w-100p top pd-15 d-f al-center gap-10`}>
                            <div className={`${styles.avatar}`}></div>
                            <div className="f-column">
                                <div className={styles.name}>Войти в аккаунт</div>
                            </div>
                        </div>
                }

                <div className={`${styles.nav} f-column gap-5`}>
                    <Link onClick={handleCloseMenu} to={"/favorites"} className={`${styles.item} w-100p d-f al-center gap-10`}>
                        <FavoriteIcon strokeColor={"#D900B6"} height={18} width={18} />
                        <p>Избранное</p>
                    </Link>
                    <Link onClick={handleCloseMenu} to={"/seen"} className={`${styles.item} w-100p d-f al-center gap-10`}>
                        <SeenIcon strokeColor={"#D900B6"} height={18} width={18} />
                        <p>Просмотренное</p>
                    </Link>
                    {
                        token ? <>
                            {/* <div onClick={openChat} className={`${styles.item} w-100p d-f al-center gap-10 p-rel`}>
                                <MessengerIcon strokeColor={"#D900B6"} width={18} height={18} />
                                <p>Сообщения</p>
                            </div> */}
                            <Link onClick={handleCloseMenu} to={"/profile/history"} className={`${styles.item} w-100p d-f al-center gap-10`}>
                                <p>Мои заказы</p>
                            </Link>
                            <Link onClick={handleCloseMenu} to={"/guide/excursions"} className={`${styles.item} w-100p d-f al-center gap-10`}>
                                <p>Мои экскурсии</p>
                            </Link>
                        </> : null
                    }


                </div>
                {token ?
                    <div className={`pd-15 ${styles.logout}`}>
                        <p onClick={handleLogout}>Выйти</p>
                    </div> :
                    <div onClick={handleCloseMenu} className={`pd-15 ${styles.logout}`}>
                        <p>Закрыть</p>
                    </div>
                }

            </div>

        </div>
    );
};

export default MobileMenu;