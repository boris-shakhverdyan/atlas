import { FC, useEffect } from 'react';
import ShadowWrapper from '../../ShadowWrapper';
import ModalBody from '../ModalBody';
import { CloseIcon } from '../../../icons';
import FilledButton from '../../Buttons/FilledButton';
import InputField from '../../TextFields/InputField';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { handleSelection } from '../../../features/modals/modalsSlice';
import InputMask from 'react-input-mask';
import styles from './selection.module.scss';
import {
    FormChangeValByKey,
    handleSelectionForm,
    SelectionFormType,
    setSelectionForm,
} from '../../../features/forms/formsSlice';
import useToken from '../../../hooks/useToken';
import { formatPhoneNumber } from '../../../utils/formatePhone';

type SelectionInputProps = {
    placeholder: string;
} & FormChangeValByKey<SelectionFormType>;

const SelectionInput: FC<SelectionInputProps> = ({ keyField, placeholder, val }) => {
    const dispatch = useAppDispatch();

    if (keyField === 'phone') {
        return (
            <InputMask
                value={val}
                mask={'+9(999)999-99-99'}
                placeholder={'+7'}
                onChange={(e) =>
                    dispatch(
                        handleSelectionForm({
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
                    handleSelectionForm({
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

const SelectionModal = () => {
    const dispatch = useAppDispatch();
    const token = useToken();

    const selection = useAppSelector((state) => state.forms.selectionForm);
    const profile = useAppSelector((state) => state.profile.data);
    const handleModal = () => dispatch(handleSelection());

    useEffect(() => {
        if (token) {
            dispatch(
                setSelectionForm({
                    phone: formatPhoneNumber(profile.phone),
                    name: '',
                }),
            );
        }
    }, [dispatch, token, profile.phone]);

    return (
        <ShadowWrapper onClick={handleModal}>
            <ModalBody className={`${styles.selectionWindow} f-column-betw`}>
                <div onClick={handleModal} className="f-c-col w-content p-abs modalCloseBtn">
                    <CloseIcon width={24} height={24} />
                </div>
                <h2 className="section-subtitle">Подберём экскурсию!</h2>
                <div className={`${styles.form} f-1 f-row-betw gap-20`}>
                    <InputField
                        mistake={!selection.isHiddenErrsValid ? selection.errors?.phone : ''}
                        wrapperClass={`bx-shadow d-f al-end w-100p pd-20`}
                        className={'w-100p'}
                        inputId={'s'}
                        fieldName={'Телефон*'}
                    >
                        <SelectionInput
                            placeholder={'+7'}
                            keyField={'phone'}
                            val={selection.data.phone}
                        />
                    </InputField>
                    <InputField
                        mistake={!selection.isHiddenErrsValid ? selection.errors?.name : ''}
                        wrapperClass={`bx-shadow d-f al-end w-100p pd-20`}
                        className={'w-100p'}
                        inputId={'s'}
                        fieldName={'Имя*'}
                    >
                        <SelectionInput
                            placeholder={'Иван'}
                            keyField={'name'}
                            val={selection.data.name}
                        />
                    </InputField>
                </div>
                <FilledButton
                    disabled={selection.disabledBtn}
                    className={`${styles.btn} w-100p f-1`}
                    title={'Запросить подбор'}
                />
            </ModalBody>
        </ShadowWrapper>
    );
};

export default SelectionModal;
