import { FC } from 'react';
import ShadowWrapper from "../../ShadowWrapper";
import ModalBody from "../ModalBody";
import {CloseIcon, SuccessGreenIcon} from "../../../icons";
import FilledButton from "../../Buttons/FilledButton";
import {useAppDispatch} from "../../../app/hooks";
import {handleLogin, handleRegister} from "../../../features/modals/modalsSlice";

type SuccessfullyProps = {
    onClose?: () => void
}
const Successfully: FC<SuccessfullyProps> = ({onClose}) => {
    const dispatch = useAppDispatch()

    const handleToLogin = () => {
        dispatch(handleRegister())
        dispatch(handleLogin())
    }
    return (
        <ShadowWrapper>
            <ModalBody className={"f-column-betw"}>
                <div onClick={onClose} className="f-c-col w-content p-abs modalCloseBtn">
                    <CloseIcon width={24} height={24}/>
                </div>
                <h2 className="section-subtitle">Вы зарегистрировались!</h2>
                <div className="w-100p d-f jc-center">
                    <SuccessGreenIcon/>
                </div>

                <FilledButton clickHandle={handleToLogin} className={"w-100p f-1"} title={"Войти в аккаунт"}/>
            </ModalBody>
        </ShadowWrapper>
    );
};

export default Successfully;