import { useContext } from 'react';
import { ExcursionFormContext } from '../..';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import UnfilledButton from '../../../../../../components/Buttons/UnfilledButton';
import InputField from '../../../../../../components/TextFields/InputField';
import {
    editDetail,
    editNeedKnow,
    handleTextExcursionForm,
} from '../../../../../../features/excursion-form/excursionFormSlice';
import styles from '../../newExcursion.module.scss';

export const DescriptionStep = () => {
    const dispatch = useAppDispatch();
    const { textData, data } = useAppSelector((state) => state.excursionForm);
    const { handleNextStep } = useContext(ExcursionFormContext);

    return (
        <div className={'f-column gap-25'}>
            <div className="section-subtitle">Описание экскурсии</div>
            <div className="formArea gap-30 f-column">
                <InputField
                    wrapperClass={'d-f al-end w-100p pd-20'}
                    className={'w-100p'}
                    inputId={'s'}
                    fieldName={'Название экскурсии'}
                >
                    <input
                        placeholder={'Название...'}
                        value={textData.title}
                        onChange={(e) =>
                            dispatch(
                                handleTextExcursionForm({ keyField: 'title', val: e.target.value }),
                            )
                        }
                        className={`f-1`}
                    />
                </InputField>
                <InputField
                    wrapperClass={`d-f w-100p pd-20 ${styles.bigArea}`}
                    className={'w-100p'}
                    inputId={'s'}
                    fieldName={'Слоган экскурсии'}
                >
                    <textarea
                        placeholder={'Слоган...'}
                        value={textData.slogan}
                        onChange={(e) =>
                            dispatch(
                                handleTextExcursionForm({
                                    keyField: 'slogan',
                                    val: e.target.value,
                                }),
                            )
                        }
                        className={`f-1`}
                    ></textarea>
                </InputField>
                <InputField
                    wrapperClass={`d-f w-100p pd-20 ${styles.bigArea}`}
                    className={'w-100p'}
                    inputId={'s'}
                    fieldName={'Описание экскурсии'}
                >
                    <textarea
                        placeholder={'Описание...'}
                        value={textData.description}
                        onChange={(e) =>
                            dispatch(
                                handleTextExcursionForm({
                                    keyField: 'description',
                                    val: e.target.value,
                                }),
                            )
                        }
                        className={`f-1`}
                    ></textarea>
                </InputField>
                <InputField
                    wrapperClass={`d-f w-100p pd-20 ${styles.bigArea}`}
                    className={'w-100p'}
                    inputId={'s'}
                    fieldName={'Организационные детали'}
                >
                    <textarea
                        placeholder={'Опишите организационные детали экскурсии...'}
                        onChange={(e) => dispatch(editDetail({ index: 0, val: e.target.value }))}
                        value={data.details[0]}
                        className={`f-1`}
                    ></textarea>
                </InputField>

                <InputField
                    wrapperClass={`d-f w-100p pd-20 ${styles.bigArea}`}
                    className={'w-100p'}
                    inputId={'s'}
                    fieldName={'Что важно знать?'}
                >
                    <textarea
                        placeholder={'Напишите, что важно знать об экскурсии.'}
                        onChange={(e) => dispatch(editNeedKnow({ index: 0, val: e.target.value }))}
                        value={data.needKnow[0]}
                        className={`f-1`}
                    ></textarea>
                </InputField>
            </div>
            <div className="f-row-betw">
                <UnfilledButton onClick={handleNextStep} title={'Далее'} />
            </div>
        </div>
    );
};
