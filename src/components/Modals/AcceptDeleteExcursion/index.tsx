
import ShadowWrapper from "../../ShadowWrapper";
import ModalBody from "../ModalBody";
import { CloseIcon, SuccessGreenIcon } from "../../../icons";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { handleAcceptDelete } from "../../../features/modals/modalsSlice";
import styles from "./acceptDelete.module.scss"
import { CustomSpinner } from "../../Preloader";
import UnfilledButton from "../../Buttons/UnfilledButton";
import { deleteExcursion, removeExcursion, resetCurrentDeleting, resetDeletingStatus } from "../../../features/guide/guideSlice";
import { useEffect } from "react";

const AcceptDeleteExcursion = () => {
    const dispatch = useAppDispatch()
    const { currentDeleting, deleting } = useAppSelector(state => state.guide)

    const handleModal = () => dispatch(handleAcceptDelete())

    const closeModal = () => {
        dispatch(resetCurrentDeleting())
        dispatch(resetDeletingStatus())
        handleModal()
    }

    const sendExcursionDelete = () => {
        dispatch(deleteExcursion({ id: currentDeleting.id }))

    }

    useEffect(() => {
        if (deleting.success) {
            dispatch(removeExcursion(currentDeleting.id))
            dispatch(resetCurrentDeleting())
        }
    }, [deleting.success, currentDeleting.id, dispatch])

    return (
        <ShadowWrapper onClick={!deleting.loading ? closeModal : undefined}>
            <ModalBody className={`${styles.acceptDeleteWindow} f-column-betw`}>
                <div onClick={!deleting.loading ? closeModal : undefined} className="f-c-col w-content p-abs modalCloseBtn">
                    <CloseIcon width={24} height={24} />
                </div>
                {
                    deleting.success === null ?
                        <div className="f-column gap-20 w-100p">
                            <h2 className={`${styles.title} d-f gap-10 flex-wrap`}>Удаление экскурсии</h2>
                            <p className={styles.description}>Если вы действительно хотите удалить экскурсию "{currentDeleting.title}", подтвердите действие.<br /> <br /> Восстановить удаленную экскурсию будет невозможно.</p>
                            <div className={"w-100p f-row-betw gap-30 flex-wrap"}>
                                {
                                    !deleting.loading ? <>
                                        <UnfilledButton disabled={deleting.loading} onClick={!deleting.loading ? closeModal : undefined} className={`f-1 ${styles.cancel}`} title={"Отмена"} />
                                        <UnfilledButton onClick={sendExcursionDelete} className={`f-1 ${styles.delete}`} title={"Удалить"} />
                                    </> :
                                        <div className={"w-100p f-c-col"}>
                                            <CustomSpinner height={30} width={30} />
                                        </div>
                                }
                            </div>
                        </div> :
                        deleting.success ?
                            <div className={"f-column gap-30"}>
                                <div className={"f-c-row gap-20"}>
                                    <SuccessGreenIcon />
                                    <h2>Экскурсия успешно удалена!</h2>
                                </div>
                                <UnfilledButton onClick={closeModal} title={"Принять"} />
                            </div> :
                            <div className={"f-column gap-30"}>
                                <div className={"f-c-row gap-20"}>
                                    <CloseIcon height={80} width={80} />
                                    <h2>Не удалось удалить экскурсию!</h2>
                                </div>
                                <UnfilledButton onClick={closeModal} title={"Закрыть"} />
                            </div>
                }
            </ModalBody>
        </ShadowWrapper>
    );
};

export default AcceptDeleteExcursion;