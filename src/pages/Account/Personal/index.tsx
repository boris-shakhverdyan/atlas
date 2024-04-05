import { FC } from 'react';
import styles from './profile.module.scss';
import { AvatarDefaultIcon, EditIcon } from '../../../icons';
import UnfilledButton from '../../../components/Buttons/UnfilledButton';
import FilledButton from '../../../components/Buttons/FilledButton';
import useProfileLayoutTitle from '../../../hooks/useProfileLayoutTitle';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import InputField from '../../../components/TextFields/InputField';
import InputMask from 'react-input-mask';
import { formatPhoneNumber } from '../../../utils/formatePhone';
import { editUser, handleProfileForm } from '../../../features/profile/profileSlice';
import ChangePasswordModal from '../../../components/Modals/ChangePassword';
import {
    handleAvatarEditor,
    handleChangePasswordModal,
    handleToGuide,
} from '../../../features/modals/modalsSlice';
import { CustomSpinner } from '../../../components/Preloader';
import {
    FormChangeValByKey,
} from '../../../features/forms/formsSlice';
import { ProfileData } from '../../../types/user.types';
import { EditProfileRequest } from '../../../types/api/user.api.types';
import ToGuideModal from '../../../components/Modals/ToGuideModal';
import { MIN_DESCRIPTION_GUIDE_COUNT } from '../../../config/validation/forms.rules';
import { EditAvatar } from '../../../components/Modals/EditAvatar';
import { domain } from '../../../http/instance';

// const testAvatar =
//     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfKtDxj-_xaxVlTw5UkzFK4muOVet2z6AnakXpdRk9NiI7X4EDgMBCuH6FX8wNNda_lpk&usqp=CAU';

type ProfileInputProps = {
    placeholder: string;
} & FormChangeValByKey<ProfileData>;

const ProfileInput: FC<ProfileInputProps> = ({ keyField, placeholder, val }) => {
    const dispatch = useAppDispatch();

    if (keyField === 'phone') {
        return (
            <InputMask
                value={val}
                mask={'+9(999)999-99-99'}
                placeholder={'+7'}
                onChange={(e) =>
                    dispatch(
                        handleProfileForm({
                            keyField: keyField,
                            val: e.target.value,
                        }),
                    )
                }
            />
        );
    }
    return (
        <input
            onChange={(e) =>
                dispatch(
                    handleProfileForm({
                        keyField: keyField,
                        val: e.target.value,
                    }),
                )
            }
            value={val}
            placeholder={placeholder}
            className={`f-1`}
        />
    );
};

const MakeGuideBtn = () => {
    const dispatch = useAppDispatch();
    const handleToGuideModal = () => dispatch(handleToGuide());
    const { disabledToGuideBtn } = useAppSelector((state) => state.profile.form);
    return (
        <UnfilledButton
            disabled={disabledToGuideBtn}
            onClick={handleToGuideModal}
            className={styles.stayGuideBtn}
            title={'Стать гидом'}
        />
    );
};

const Personal = () => {
    const dispatch = useAppDispatch();
    const { data, form, isLoading } = useAppSelector((state) => state.profile);
    const { changePassword, toGuide, avatarEditor } = useAppSelector((state) => state.modals);

    const handleChangePswdModal = () => dispatch(handleChangePasswordModal());

    const sendEditUser = () => {
        const data: EditProfileRequest = {
            email: form.data.email,
            last_name: form.data.last_name,
            first_name: form.data.first_name,
            description: form.data.description,
            video_presentation: form.data.video_presentation,
            is_gid: form.data.is_gid,
        };
        dispatch(editUser(data));
    };

    useProfileLayoutTitle(`Здравствуйте, ${data.first_name}`);

    return (
        <>
            <div className="w-100p f-column gap-60">
                <div className={`${styles.content} form f-column gap-20`}>
                    <div className={`${styles.contentPersonal} d-f jc-between gap-70`}>
                        <div
                            style={
                                form.data.profile_photo
                                    ? {
                                          backgroundImage: `url(${domain}${form.data.profile_photo})`,
                                      }
                                    : {}
                            }
                            className={`${styles.avatar} bg-cover f-c-col p-rel`}
                        >
                            {!form.data.profile_photo ? <AvatarDefaultIcon /> : null}
                            <div
                                onClick={() => dispatch(handleAvatarEditor())}
                                className={`f-c-col ${styles.edit}`}
                            >
                                <EditIcon width={19} height={19} />
                            </div>
                        </div>
                        <div className="f-1 f-column gap-20">
                            <div className={`d-f gap-40 ${styles.inputsPart}`}>
                                <InputField
                                    wrapperClass={`f-row-betw w-100p pd-20 ${styles.wrapperInput}`}
                                    className={'f-1'}
                                    inputId={'s'}
                                    fieldName={'Имя'}
                                >
                                    {isLoading ? (
                                        <CustomSpinner height={20} width={20} />
                                    ) : (
                                        <ProfileInput
                                            keyField={'first_name'}
                                            val={form.data.first_name}
                                            placeholder={''}
                                        />
                                    )}
                                </InputField>
                                <InputField
                                    wrapperClass={`f-row-betw w-100p pd-20 ${styles.wrapperInput}`}
                                    className={'f-1'}
                                    inputId={'s'}
                                    fieldName={'Фамилия'}
                                >
                                    {isLoading ? (
                                        <CustomSpinner height={20} width={20} />
                                    ) : (
                                        <ProfileInput
                                            keyField={'last_name'}
                                            val={form.data.last_name}
                                            placeholder={''}
                                        />
                                    )}
                                </InputField>
                            </div>
                            <div className={`d-f gap-40 ${styles.inputsPart}`}>
                                <InputField
                                    wrapperClass={`f-row-betw w-100p pd-20 ${styles.wrapperInput}`}
                                    className={`f-1 ${styles.aboutSelfWrapper}`}
                                    inputId={'s'}
                                    fieldName={'Email'}
                                >
                                    {isLoading ? (
                                        <CustomSpinner height={20} width={20} />
                                    ) : (
                                        <ProfileInput
                                            keyField={'email'}
                                            val={form.data.email}
                                            placeholder={''}
                                        />
                                    )}
                                </InputField>
                                <InputField
                                    wrapperClass={`f-row-betw w-100p pd-20 ${styles.wrapperInput}`}
                                    className={'f-1'}
                                    inputId={'s'}
                                    fieldName={'Телефон'}
                                >
                                    {isLoading ? (
                                        <CustomSpinner height={20} width={20} />
                                    ) : (
                                        <InputMask
                                            readOnly={true}
                                            value={formatPhoneNumber(form.data.phone)}
                                            className={`f-1 ${styles.input}`}
                                            mask={'+9(999)999-99-99'}
                                            placeholder={'+7'}
                                            onChange={undefined}
                                        />
                                    )}
                                </InputField>
                            </div>
                            <div
                                className={`d-f gap-40 ${styles.inputsPart}  ${
                                    !data.is_gid ? 'al-end' : null
                                }`}
                            >
                                <InputField
                                    onClick={handleChangePswdModal}
                                    wrapperClass={`f-row-betw w-100p pd-20 ${styles.wrapperInput}`}
                                    className={`f-1 ${styles.aboutSelfWrapper}`}
                                    inputId={'s'}
                                    fieldName={'Пароль'}
                                >
                                    <input
                                        value={'Изменить пароль'}
                                        readOnly
                                        className={`colorPurple f-1 ${styles.input}`}
                                    />
                                </InputField>
                                {data.is_gid ? (
                                    <InputField
                                        wrapperClass={`f-row-betw w-100p pd-20 ${styles.wrapperInput}`}
                                        className={'f-1'}
                                        inputId={'s'}
                                        fieldName={'Ссылка на видеовизитку'}
                                    >
                                        {isLoading ? (
                                            <CustomSpinner height={20} width={20} />
                                        ) : (
                                            <ProfileInput
                                                keyField={'video_presentation'}
                                                val={form.data.video_presentation}
                                                placeholder={''}
                                            />
                                        )}
                                    </InputField>
                                ) : (
                                    <MakeGuideBtn />
                                )}
                            </div>
                        </div>
                    </div>
                    {data.is_gid ? (
                        <div className="f-column gap-5">
                            <InputField
                                wrapperClass={`d-f al-end w-100p pd-20 ${styles.wrapperInput}`}
                                className={'w-100p'}
                                inputId={'s'}
                                fieldName={'О себе'}
                            >
                                {isLoading ? (
                                    <CustomSpinner height={20} width={20} />
                                ) : (
                                    <textarea
                                        value={form.data.description}
                                        onChange={(e) =>
                                            dispatch(
                                                handleProfileForm({
                                                    keyField: 'description',
                                                    val: e.target.value,
                                                }),
                                            )
                                        }
                                        className={`${styles.aboutInput} f-1`}
                                    ></textarea>
                                )}
                            </InputField>
                            {form.data.description.length < 150 ? (
                                <p className={'errColor'}>
                                    Минимум {MIN_DESCRIPTION_GUIDE_COUNT} символов (
                                    {form.data.description.length}/{MIN_DESCRIPTION_GUIDE_COUNT})
                                </p>
                            ) : null}
                        </div>
                    ) : null}
                </div>
                <FilledButton
                    clickHandle={sendEditUser}
                    className={styles.saveBtn}
                    disabled={form.disabledBtn}
                    title={'Сохранить изменения'}
                />
            </div>
            {avatarEditor ? <EditAvatar /> : null}

            {changePassword ? <ChangePasswordModal /> : null}
            {!data.is_gid && toGuide ? <ToGuideModal /> : null}
        </>
    );
};

export default Personal;
