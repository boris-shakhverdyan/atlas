import { FC } from 'react';
import ShadowWrapper from "../../ShadowWrapper";
import ModalBody from "../ModalBody";
import { CloseIcon, SuccessGreenIcon } from "../../../icons";
import FilledButton from "../../Buttons/FilledButton";
import InputField from "../../TextFields/InputField";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { handleChangePasswordModal } from "../../../features/modals/modalsSlice";
import styles from './selection.module.scss'
import { FormChangeValByKey, handleChangePasswordForm, resetChangePasswordForm } from "../../../features/forms/formsSlice";
import { ChangePasswordData } from '../../../types/user.types';
import { changePasswordUser, resetChangePasswordStatus } from '../../../features/profile/profileSlice';
import { CustomSpinner } from '../../Preloader';

type ChangePasswordInputProps = {
    placeholder: string,
} & FormChangeValByKey<ChangePasswordData>

const ChangePasswordInput: FC<ChangePasswordInputProps> = ({ keyField, placeholder, val }) => {
    const dispatch = useAppDispatch()


    return <input onChange={e => dispatch(handleChangePasswordForm({
        keyField: keyField,
        val: e.target.value
    }))} value={val} placeholder={placeholder} className={`f-1`} />

}

const ChangePasswordModal = () => {
    const dispatch = useAppDispatch()
    const formData = useAppSelector(state => state.forms.changePasswordForm)
    const { sending, success } = useAppSelector(state => state.profile.changePassword)
    const pswdsIsNotEqual = formData.data.new_password !== formData.data.new_password_again
    const btnDisabled = formData.disabledBtn

    const handleModal = () => dispatch(handleChangePasswordModal())

    const closeModal = () => {
        handleModal()
        dispatch(resetChangePasswordForm())
        dispatch(resetChangePasswordStatus())
        
    }
    const sendChangePassword = () => {
        dispatch(changePasswordUser(formData.data));
    }

    return (
        <ShadowWrapper onClick={closeModal}>
            <ModalBody className={`${styles.changePasswordWindow} f-column-betw`}>
                <div onClick={closeModal} className="f-c-col w-content p-abs modalCloseBtn">
                    <CloseIcon width={24} height={24} />
                </div>
                <h2 className="section-subtitle">Изменение пароля</h2>
                {!success ?
                    <>
                        <div className={`${styles.form} f-1 f-row-betw gap-20`}>
                            <InputField mistake={!formData.isHiddenErrsValid ? formData.errors?.old_password : ""}
                                wrapperClass={`bx-shadow d-f al-end w-100p pd-20`} className={"w-100p"} inputId={"s"}
                                fieldName={"Cтарый пароль*"}>
                                <ChangePasswordInput placeholder={"Введите старый пароль"} keyField={"old_password"} val={formData.data.old_password} />
                            </InputField>
                            <div className="f-column w-100p gap-10">
                                <InputField mistake={!formData.isHiddenErrsValid ? formData.errors?.new_password : ""}
                                    wrapperClass={`bx-shadow d-f al-end w-100p pd-20`} className={"w-100p"} inputId={"s"}
                                    fieldName={"Новый пароль*"}>
                                    <ChangePasswordInput placeholder={"Введите новый пароль"} keyField={"new_password"} val={formData.data.new_password} />
                                </InputField>
                                <p className={""}>Минимум 8 символов.</p>
                            </div>

                            <div className="f-column w-100p gap-15">
                                <InputField mistake={!formData.isHiddenErrsValid ? formData.errors?.new_password_again : ""}
                                    wrapperClass={`bx-shadow d-f al-end w-100p pd-20`} className={"w-100p"} inputId={"s"}
                                    fieldName={"Подтверждение нового пароля*"}>
                                    <ChangePasswordInput placeholder={"Введите новый пароль еще раз"} keyField={"new_password_again"} val={formData.data.new_password_again} />
                                </InputField>
                                {pswdsIsNotEqual ? <p className={"errColor"}>Пароль не подтверждён.</p> : null}
                            </div>
                        </div>
                        <div className="f-column gap-10">
                            {sending ? <CustomSpinner height={20} width={20} /> : null}
                            <FilledButton clickHandle={sendChangePassword} disabled={btnDisabled || sending} className={`${styles.btn} w-100p f-1`} title={"Применить"} />
                        </div>
                    </> :
                    <>
                        <div className="d-f al-center gap-20">
                            <SuccessGreenIcon height={40} width={40} />
                            <p style={{fontSize: 16}}>Пароль успешно изменен!</p>
                        </div>
                        <FilledButton clickHandle={closeModal} className={`${styles.btn} w-100p f-1`} title={"Закрыть"} />
                    </>
                }


            </ModalBody>
        </ShadowWrapper>
    );
};

export default ChangePasswordModal;