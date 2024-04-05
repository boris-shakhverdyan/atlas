import styles from './mobileBar.module.scss'
import { Link } from "react-router-dom";
import { FavoriteIcon, ProfileIcon, SearchIcon, SeenIcon } from "../../icons";
import CountBlock from "../CountBlock";
import { handleLogin } from "../../features/modals/modalsSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const MobileBar = () => {
    const { authorized } = useAppSelector(state => state.profile)
    const dispatch = useAppDispatch()
    
    return (
        <div className={`${styles.mobileBar} p-fix bottom-0 w-100p`}>
            <div className="wrapper">
                <div className="mobileBarBlock f-row-betw">
                    <Link to={'/search'}>
                        <div className={`${styles.navItem} ${styles.navItem} f-column al-center gap-5 p-rel`}>
                            <SearchIcon width={34} height={34} strokeColor={"white"} />
                        </div>
                    </Link>
                    <Link to={'/favorites'}>
                        <div className={`${styles.navItem} f-column al-center gap-5 p-rel`}>
                            <FavoriteIcon width={34} height={31} />
                        </div>
                    </Link>
                    {/* <div onClick={openChat}>
                        <div className={`${styles.navItem} f-column al-center gap-5 p-rel`}>
                            <MessengerIcon width={34} height={34} />
                            <CountBlock value={3} className={styles.messengerCount} />
                        </div>
                    </div> */}
                    <Link to={'/seen'}>
                        <div className={`${styles.navItem} f-column al-center gap-5 p-rel`}>
                            <SeenIcon width={34} height={31} />
                            <CountBlock value={14} className={styles.seenCount} />
                        </div>
                    </Link>
                    {
                        authorized ?
                            <Link to={'/profile'}>
                                <div className={`${styles.navItem} f-column al-center gap-5 p-rel`}>
                                    <ProfileIcon width={31} height={31} />
                                </div>
                            </Link> :
                            <div onClick={() => dispatch(handleLogin())}
                                className={`${styles.navItem} f-column al-center gap-5 p-rel`}>
                                <ProfileIcon width={31} height={31} />
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default MobileBar;