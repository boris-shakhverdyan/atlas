import { FC, useEffect, useState } from 'react';
import ShadowWrapper from "../../../ShadowWrapper";
import styles from "../auth.module.scss"
import InputField from "../../../TextFields/InputField";
import FilledButton from "../../../Buttons/FilledButton";
import { CloseIcon } from "../../../../icons";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { handleLogin, handleRegister, handleSuccessRegister } from "../../../../features/modals/modalsSlice";
import ModalBody from "../../ModalBody";
import InputMask from 'react-input-mask';
import {
    FormChangeValByKey,
    handleRegisterForm,
    handleRegisterGuide,
    handleVisibilityValidationErrs,
    RegisterFormType,
    resetRegisterForm,
    resetRegisterFormData
} from "../../../../features/forms/formsSlice";
import { UserApi } from "../../../../http/api/user.api";
import { extractDigits } from "../../../../utils/normalizePhone";
import Successfully from "../../Successfully";
import { CustomSpinner } from '../../../Preloader';
import { MIN_DESCRIPTION_GUIDE_COUNT } from '../../../../config/validation/forms.rules';


type RegisterInputProps = {
    placeholder: string,
} & FormChangeValByKey<RegisterFormType>

const RegisterInput: FC<RegisterInputProps> = ({ keyField, placeholder, val }) => {
    const dispatch = useAppDispatch()

    if (keyField === "phone") {
        return <InputMask value={val} mask={"+7(999)999-99-99"} placeholder={"+7"} onChange={e =>
            dispatch(handleRegisterForm({
                keyField: keyField,
                val: e.target.value
            }))} />
    }
    return <input onChange={e => dispatch(handleRegisterForm({
        keyField: keyField,
        val: e.target.value
    }))} value={val} placeholder={placeholder} className={`f-1`} />

}

const RegisterForm: FC<{ errResText: string }> = ({ errResText }) => {
    const dispatch = useAppDispatch()
    const register = useAppSelector(state => state.forms.registerForm)

    useEffect(() => {
        dispatch(resetRegisterFormData())
    }, [register.data.is_gid, dispatch])

    return (
        <div className={`f-1 f-column gap-15`}>
            <div className={`${styles.authFields} f-row-betw gap-20`}>
                <InputField wrapperClass={`bx-shadow d-f al-end w-100p pd-20 ${styles.authInputWrapper}`} className={`w-100p`} inputId={"s"}
                    fieldName={"Имя*"}>
                    <RegisterInput placeholder={"Иван"} keyField={"first_name"} val={register.data.first_name} />
                </InputField>
                <InputField wrapperClass={`bx-shadow d-f al-end w-100p pd-20 ${styles.authInputWrapper}`} className={`w-100p`} inputId={"s"}
                    fieldName={"Фамилия*"}>
                    <RegisterInput placeholder={"Иванов"} keyField={"last_name"} val={register.data.last_name} />
                </InputField>

            </div>
            <div className={`${styles.authFields} f-row-betw gap-20`}>
                <InputField wrapperClass={`bx-shadow d-f al-end w-100p pd-20 ${styles.authInputWrapper}`} className={"w-100p"} inputId={"s"}
                    fieldName={"Телефон*"}>
                    <RegisterInput placeholder={"+7"} keyField={"phone"} val={register.data.phone} />
                </InputField>
                <InputField mistake={!register.isHiddenErrsValid ? register.errors?.password : ""}
                    wrapperClass={`bx-shadow d-f al-end w-100p pd-20 ${styles.authInputWrapper}`} className={"w-100p"} inputId={"s"}
                    fieldName={"Пароль*"}>
                    <RegisterInput placeholder={"Придумайте пароль"} keyField={"password"}
                        val={register.data.password} />
                </InputField>
            </div>
            <InputField mistake={!register.isHiddenErrsValid ? register.errors?.email : ""}
                wrapperClass={`bx-shadow d-f al-end w-100p pd-20 ${styles.authInputWrapper}`} className={"w-100p"} inputId={"s"}
                fieldName={"Почта*"}>
                <RegisterInput placeholder={"Иванов"} keyField={"email"} val={register.data.email} />
            </InputField>
            {register.data.is_gid ?
                <div className="f-column gap-10">
                    <InputField mistake={!register.isHiddenErrsValid ? register.errors?.email : ""}
                        wrapperClass={`bx-shadow d-f al-end w-100p pd-20 ${styles.authInputWrapper}`} className={"w-100p"} inputId={"s"}
                        fieldName={"Описание*"}>
                        <textarea onChange={e => dispatch(handleRegisterForm({
                            keyField: "description",
                            val: e.target.value
                        }))} placeholder={"Презентуйте себя..."} value={register.data.description} className={`f-1 ${styles.aboutGuide}`}></textarea>
                    </InputField>
                    {
                        String(register.data.description).length < MIN_DESCRIPTION_GUIDE_COUNT ?
                            <p style={{ fontSize: 12 }} className={"errColor"}>Минимум {MIN_DESCRIPTION_GUIDE_COUNT} символов ({register.data.description?.length}/{MIN_DESCRIPTION_GUIDE_COUNT})</p>
                            : null
                    }

                </div>
                : null
            }
            {
                errResText.length ?
                    <p className={"errColor"}>{errResText}</p> :
                    null
            }

        </div>
    )
}
// const RegisterAsUser: FC<RegisterWayProps> = ({handleToLogin}) => {
//     const {disabledBtn} = useAppSelector(state => state.forms.registerForm)
//
//
//     const dispatch = useAppDispatch()
//     const handleClickRegister = () => {
//         dispatch(checkValidRegister())
//         alert("sas")
//     }
//
//     return (
//         <>
//             <RegisterForm/>
//             <div className="f-row-betw gap-10">
//                 <FilledButton disabled={disabledBtn} clickHandle={handleClickRegister} className={styles.btn} title={"Регистрация"}/>
//                 <div className={`${styles.altText} f-column al-center gap-5`}>
//                     <p>Уже зарегистрированы?</p>
//                     <div onClick={handleToLogin} className={styles.toAltWindow}>
//                         Войти в аккаунт
//                     </div>
//                 </div>
//             </div>
//         </>
//
//     )
// }
//
// const RegisterAsGuide: FC<RegisterWayProps> = ({handleToLogin}) => {
//     const {disabledBtn} = useAppSelector(state => state.forms.registerForm)
//
//     return (
//         <>
//
//             <div className="f-row-betw gap-10">
//                 <FilledButton disabled={disabledBtn}  className={styles.btn} title={"Стать гидом"}/>
//                 <div className={`${styles.altText} f-column al-center gap-5`}>
//                     <p>Уже зарегистрированы?</p>
//                     <div onClick={handleToLogin} className={styles.toAltWindow}>
//                         Войти в аккаунт
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

const RegisterModal = () => {
    const dispatch = useAppDispatch()
    const register = useAppSelector(state => state.forms.registerForm)
    const { successfullyRegister } = useAppSelector(state => state.modals)

    const [registerLoading, setRegisterLoading] = useState(false)
    const [resErrs, setResErrs] = useState("")

    const handleCloseRegister = () => {
        if (successfullyRegister) {
            dispatch(handleSuccessRegister())
        }

        dispatch(handleRegister())
        dispatch(resetRegisterForm())
    }

    const handleToLogin = () => {
        handleCloseRegister()
        dispatch((handleLogin()))
    }

    const handleRegisterBtn = async () => {
        setResErrs("")
        const hasValidErrors = Object.keys(register.errors).length

        if (hasValidErrors) {
            dispatch(handleVisibilityValidationErrs())
        } else {
            try {
                setRegisterLoading(true)
                const res = await UserApi.Registration({
                    ...register.data,
                    phone: extractDigits(register.data.phone),
                })

                if (res.data.message) {
                    dispatch(handleSuccessRegister())
                }
            } catch (err: any) {
                const keysData = Object.keys(err.response.data)
                const isBadReq = err.response.status === 400 && keysData.length

                if (isBadReq) {
                    const firstErrField = err.response.data[keysData[0]]
                    setResErrs(firstErrField)
                    return;
                }

            } finally {
                setRegisterLoading(false)
            }

        }
    }
    useEffect(() => {
        setResErrs("")
    }, [register])


    return (
        <ShadowWrapper onClick={handleCloseRegister}>
            {successfullyRegister ? <Successfully onClose={handleCloseRegister} /> : null}
            <ModalBody className={styles.authWindow}>
                <div onClick={handleCloseRegister} className="f-c-col w-content p-abs modalCloseBtn">
                    <CloseIcon width={24} height={24} />
                </div>
                <div className="top f-column gap-20">
                    <h2 className="section-subtitle">Регистрация</h2>
                    <div className="d-f gap-40">
                        <b onClick={register.data.is_gid ? () => dispatch(handleRegisterGuide()) : undefined}
                            className={`${styles.registerWay} ${!register.data.is_gid ? "colorPurple" : ""} cur-pointer`}>Для
                            пользователя</b>
                        <b onClick={!register.data.is_gid ? () => dispatch(handleRegisterGuide()) : undefined}
                            className={`${styles.registerWay} ${register.data.is_gid ? "colorPurple" : ""} cur-pointer`}>Для
                            гида</b>
                    </div>
                </div>
                <RegisterForm errResText={resErrs} />

                <div className={`${styles.authBottom} f-row-betw gap-10`}>
                    <div className="d-f al-center gap-15">
                        <FilledButton clickHandle={handleRegisterBtn} disabled={register.disabledBtn} className={styles.btn} title={!register.data.is_gid ? "Регистрация" : "Стать гидом"} />
                        {registerLoading ? <CustomSpinner width={20} height={20} /> : null}
                    </div>


                    <div className={`${styles.altText} f-column al-center gap-5`}>
                        <p>Уже зарегистрированы?</p>
                        <div onClick={handleToLogin} className={styles.toAltWindow}>
                            Войти в аккаунт
                        </div>
                    </div>
                </div>
            </ModalBody>
        </ShadowWrapper>
    );
};

export default RegisterModal;