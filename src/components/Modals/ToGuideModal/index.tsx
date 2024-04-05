import ShadowWrapper from "../../ShadowWrapper";
import ModalBody from "../ModalBody";
import { CloseIcon } from "../../../icons";
import FilledButton from "../../Buttons/FilledButton";
import InputField from "../../TextFields/InputField";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { handleToGuide } from "../../../features/modals/modalsSlice";
import styles from './toguide.module.scss'
import { handleToGuideForm, resetToGuideForm } from "../../../features/forms/formsSlice";
import { MIN_DESCRIPTION_GUIDE_COUNT } from '../../../config/validation/forms.rules';
import { editUser } from '../../../features/profile/profileSlice';

// type ChangePasswordInputProps = {
//     placeholder: string,
// } & FormChangeValByKey<ChangePasswordData>

// const ChangePasswordInput: FC<ChangePasswordInputProps> = ({ keyField, placeholder, val }) => {
//     const dispatch = useAppDispatch()


//     return <input onChange={e => dispatch(handleChangePasswordForm({
//         keyField: keyField,
//         val: e.target.value
//     }))} value={val} placeholder={placeholder} className={`f-1`} />

// }

const ToGuideModal = () => {
    const dispatch = useAppDispatch()
    const formData = useAppSelector(state => state.forms.toGuideForm)
    const btnDisabled = formData.disabledBtn

    const handleModal = () => dispatch(handleToGuide())

    const closeModal = () => {
        handleModal()
        dispatch(resetToGuideForm())
    }

    const sendToGuide = () => {
        dispatch(editUser({
            is_gid: true,
            description: formData.data.description,
            video_presentation: formData.data.video_presentation
        }))
        closeModal()
    }

    return (
        <ShadowWrapper onClick={closeModal}>
            <ModalBody className={`${styles.toGuideWindow} f-column-betw`}>
                <div onClick={closeModal} className="f-c-col w-content p-abs modalCloseBtn">
                    <CloseIcon width={24} height={24} />
                </div>
                <h2 className="section-subtitle">Стать гидом</h2>
                <div className={`${styles.form} f-1 f-row-betw gap-20`}>
                    <div className="f-column w-100p gap-5">
                        <InputField mistake={!formData.isHiddenErrsValid ? formData.errors?.old_password : ""}
                            wrapperClass={`bx-shadow d-f al-end w-100p pd-20`} className={"w-100p"} inputId={"s"}
                            fieldName={"О себе*"}>
                            <textarea onChange={e => dispatch(handleToGuideForm({
                                keyField: "description",
                                val: e.target.value
                            }))} placeholder={"Презентуйте себя..."} value={formData.data.description} className={`f-1 ${styles.aboutGuide}`}></textarea>

                        </InputField>
                        {formData.data.description.length < MIN_DESCRIPTION_GUIDE_COUNT ?
                            <p>Минимум {MIN_DESCRIPTION_GUIDE_COUNT} символов. ({formData.data.description.length}/{MIN_DESCRIPTION_GUIDE_COUNT})</p>
                            : null
                        }
                    </div>
                    <div className="f-column w-100p gap-10">
                        <InputField mistake={!formData.isHiddenErrsValid ? "Ошибка" : ""}
                            wrapperClass={`bx-shadow d-f al-end w-100p pd-20`} className={"w-100p"} inputId={"s"}
                            fieldName={"Видеопрезентация"}>
                            <input onChange={e => dispatch(handleToGuideForm({
                                keyField: "video_presentation",
                                val: e.target.value
                            }))} value={formData.data.video_presentation} placeholder={"Ссылка на видеовизитку (YouTube)"} className={`f-1`} />
                        </InputField>

                    </div>
                </div>
                <FilledButton clickHandle={sendToGuide} disabled={btnDisabled} className={`${styles.btn} w-100p f-1`} title={"Стать гидом"} />
            </ModalBody>
        </ShadowWrapper >
    );
};

export default ToGuideModal;