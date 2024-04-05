import { FC, HTMLInputTypeAttribute, useEffect, useState } from 'react';
import ShadowWrapper from "../../../ShadowWrapper";
import styles from "../auth.module.scss"
import InputField from "../../../TextFields/InputField";
import FilledButton from "../../../Buttons/FilledButton";
import { CloseIcon } from "../../../../icons";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { handleLogin, handleRegister } from "../../../../features/modals/modalsSlice";
import ModalBody from "../../ModalBody";
import { AuthFormType, FormChangeValByKey, handleAuthForm, resetAuthForm } from "../../../../features/forms/formsSlice";
import { UserApi } from '../../../../http/api/user.api';
import { getUser, setLoginLoading } from '../../../../features/profile/profileSlice';
import { CustomSpinner } from '../../../Preloader';
import { authApi } from '../../../../http/instance';
import { storeTokens } from '../../../../utils/storeTokens';
import { useNavigate } from 'react-router-dom';

type AuthInputProps = {
    placeholder: string,
    typeInput?: HTMLInputTypeAttribute
} & FormChangeValByKey<AuthFormType>

const AuthInput: FC<AuthInputProps> = ({ keyField, placeholder, val, typeInput }) => {
    const dispatch = useAppDispatch()

    return <input onChange={e => dispatch(handleAuthForm({
        keyField: keyField,
        val: e.target.value
    }))} value={val} type={typeInput} placeholder={placeholder} className={`f-1`} />
}

const LoginModal = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const auth = useAppSelector(state => state.forms.authForm)
    const { loginLoading } = useAppSelector(state => state.profile)
    const { loginFormRedirect } = useAppSelector(state => state.forms)
    const [loginErr, setLoginErr] = useState("")

    const handleCloseLogin = () => {
        dispatch(resetAuthForm())
        dispatch(setLoginLoading(false))
        dispatch(handleLogin())
    }
    const handleToRegister = () => {
        navigate("/")
        handleCloseLogin()
        dispatch((handleRegister()))
    }

    const loginSend = async () => {
        setLoginErr("")

        try {
            dispatch(setLoginLoading(true))
            const res = await UserApi.Login(auth.data)
            storeTokens({
                access_token: res.data.access_token,
                refresh_token: res.data.refresh_token
            })

            authApi.defaults.headers["Authorization"] = `Bearer ${res.data.access_token}`;
            handleCloseLogin()
            if (loginFormRedirect) {
                dispatch(getUser())
                navigate("/profile")
            }

        } catch (error: any) {
            if (error?.code === "ERR_BAD_REQUEST") {
                const errMsg = error?.response?.data?.error
                setLoginErr(errMsg)
            }

        } finally {
            dispatch(setLoginLoading(false))
        }
    }

    useEffect(() => {
        setLoginErr("")
    }, [auth])

    return (
        <ShadowWrapper onClick={handleCloseLogin}>
            <ModalBody className={styles.authWindow}>
                <div onClick={handleCloseLogin} className="f-c-col w-content p-abs modalCloseBtn">
                    <CloseIcon width={24} height={24} />
                </div>
                <div className="f-column gap-5">
                    <h2 className="section-subtitle">Авторизация</h2>

                </div>

                <div className="f-1 f-column gap-10">
                    <div className="f-column gap-20">
                        <InputField mistake={!auth.isHiddenErrsValid ? auth.errors?.email_or_phone : ""}
                            wrapperClass={`bx-shadow d-f al-end w-100p pd-20 ${styles.authInputWrapper}`}
                            className={"w-100p"} inputId={"s"}
                            fieldName={"Телефон/Почта"}>
                            <AuthInput placeholder={"Номер телефона или почта"} keyField={"email_or_phone"}
                                val={auth.data.email_or_phone} />
                        </InputField>
                        <InputField mistake={!auth.isHiddenErrsValid ? auth.errors?.password : ""}
                            wrapperClass={`bx-shadow d-f al-end w-100p pd-20 ${styles.authInputWrapper}`}
                            className={"w-100p"} inputId={"s"}
                            fieldName={"Пароль"}>
                            <AuthInput placeholder={"Пароль"} typeInput={"password"} keyField={"password"} val={auth.data.password} />
                        </InputField>
                    </div>
                    <div className="errColor">{loginErr}</div>

                </div>
                <div className={`${styles.authBottom} gap-10 f-row-betw`}>
                    <div className="d-f al-center gap-20">
                        <FilledButton clickHandle={loginSend} disabled={auth.disabledBtn} className={styles.btn} title={"Войти"} />
                        {loginLoading ? <CustomSpinner width={20} height={20} /> : null}
                    </div>
                    <div className={`${styles.altText} f-column al-center gap-5`}>
                        <p>Нет аккаунта?</p>
                        <div onClick={handleToRegister} className={styles.toAltWindow}>
                            Регистрация
                        </div>

                    </div>
                </div>
            </ModalBody>

        </ShadowWrapper>
    );
};

export default LoginModal;