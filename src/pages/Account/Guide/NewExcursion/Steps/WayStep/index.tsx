import { useContext } from 'react';
import { ExcursionFormContext } from '../..';
import { useAppSelector, useAppDispatch } from '../../../../../../app/hooks';
import UnfilledButton from '../../../../../../components/Buttons/UnfilledButton';
import InputField from '../../../../../../components/TextFields/InputField';
import {
    addLocation,
    editLocation,
    deleteLocation,
} from '../../../../../../features/excursion-form/excursionFormSlice';
import styles from '../../newExcursion.module.scss';

export const WayStep = () => {
    const { handleNextStep, handlePrevStep } = useContext(ExcursionFormContext);
    const travelRoutes = useAppSelector((state) => state.excursionForm.data.locations);
    const dispatch = useAppDispatch();

    return (
        <div className={'f-column gap-25'}>
            <div className="section-subtitle">Маршрут экскурсии</div>
            <div className="f-column gap-30">
                <div className={'f-column gap-5 w-content'}>
                    <p className={styles.caption}>(Минимум 1 локация)</p>
                    <div onClick={() => dispatch(addLocation())} className={'w-content'}>
                        <UnfilledButton title={'+ Добавить локацию'} />
                    </div>
                </div>
                {travelRoutes.map((item, index) => (
                    <div className="locationContainer f-row-betw gap-50">
                        <InputField
                            wrapperClass={'d-f al-end w-100p pd-20 '}
                            className={'w-100p'}
                            inputId={`r_${index}`}
                            fieldName={`Локация ${index + 1}`}
                        >
                            <input
                                onChange={(e) =>
                                    dispatch(editLocation({ index, val: e.target.value }))
                                }
                                value={item}
                                placeholder={'Локация экскурсии...'}
                                className={`f-1`}
                            />
                            <div
                                onClick={() => dispatch(deleteLocation(index))}
                                className={'inputRight cur-pointer'}
                            >
                                Удалить
                            </div>
                        </InputField>
                    </div>
                ))}
            </div>
            <div className="f-row-betw">
                <UnfilledButton onClick={handlePrevStep} title={'Назад'} />
                <UnfilledButton onClick={handleNextStep} title={'Далее'} />
            </div>
        </div>
    );
};
