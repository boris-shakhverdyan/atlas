import { useContext, ChangeEvent } from 'react';
import { ExcursionFormContext } from '../..';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import UnfilledButton from '../../../../../../components/Buttons/UnfilledButton';
import SelectInput from '../../../../../../components/SelectInput';
import {
    handleMainPhoto,
    handleSelectedCity,
    handleSelectedCategory,
    handleSelectedKindExcursion,
    handleSelectedDuration,
    handleAgeLimit,
    handleSelectedPeoplesCount,
    handleSelectedTransport,
} from '../../../../../../features/excursion-form/excursionFormSlice';
import { EditIcon } from '../../../../../../icons';
import styles from '../../newExcursion.module.scss';

export const MainStep = () => {
    const dispatch = useAppDispatch();
    const {
        selectData,
        allowedCategories,
        allowedLoadings,
        allowedCities,
        allowedExcursionKinds,
        allowedDurations,
        allowedPeoplesCounts,
        allowedAges,
        allowedTransports,
        main_photo,
    } = useAppSelector((state) => state.excursionForm);
    const { handleNextStep, handlePrevStep } = useContext(ExcursionFormContext);

    const handleAddMainPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.item(0);
        if (file) {
            const src = URL.createObjectURL(file);
            dispatch(
                handleMainPhoto({
                    file,
                    src,
                }),
            );
        }
    };

    return (
        <div className={'f-column gap-25'}>
            <div className="section-subtitle">Основное</div>
            <div className="formArea gap-30 f-column">
                {/* <InputField wrapperClass={"d-f al-end w-100p pd-20"} className={"w-100p"} inputId={"s"}
                    fieldName={"Город экскурсии"}>
                    <input placeholder={"Город..."} className={`f-1`} />
                </InputField> */}
                <div className="f-column gap-5">
                    <p className={styles.labelText}>Основная фотография экскурсии</p>
                    {main_photo.file === null ? (
                        <label htmlFor={'mainPhoto'} className={'w-content'}>
                            <UnfilledButton asBlock={true} title={'+ Загрузить'} />
                        </label>
                    ) : null}
                </div>
                <input
                    onChange={(e) => handleAddMainPhoto(e)}
                    id={`mainPhoto`}
                    accept={'image/png, image/jpeg'}
                    type="file"
                    className={'d-n hidden'}
                />
                {main_photo.src ? (
                    <div className={`${styles.galleryItem} w-100p f-column gap-15`}>
                        <div className={`${styles.imageWrapper} w-100p  h-100p`}>
                            <div
                                style={{ backgroundImage: `url(${main_photo.src})` }}
                                className={`${styles.image}  bg-cover`}
                            >
                                <label htmlFor={`mainPhoto`} className={`f-c-col ${styles.edit}`}>
                                    <EditIcon />
                                </label>
                            </div>
                        </div>
                    </div>
                ) : null}

                <SelectInput
                    loading={allowedLoadings.cities}
                    fieldTextKey={'name'}
                    labelText={'Выберите город'}
                    current={selectData.city}
                    items={allowedCities}
                    selectHandler={(id) => dispatch(handleSelectedCity(id))}
                />
                <SelectInput
                    loading={allowedLoadings.categories}
                    fieldTextKey={'name'}
                    labelText={'Выберите категорию'}
                    current={selectData.category}
                    items={allowedCategories}
                    selectHandler={(id) => dispatch(handleSelectedCategory(id))}
                />
                <SelectInput
                    loading={allowedLoadings.ex_kinds}
                    fieldTextKey={'name'}
                    labelText={'Выберите тип экскурсии'}
                    current={selectData.typeExcursion}
                    items={allowedExcursionKinds}
                    selectHandler={(id) => dispatch(handleSelectedKindExcursion(id))}
                />
                <SelectInput
                    loading={allowedLoadings.ex_durations}
                    labelText={'Продолжительность экскурсии'}
                    current={selectData.duration}
                    items={allowedDurations}
                    selectHandler={(id) => dispatch(handleSelectedDuration(id))}
                />
                <SelectInput
                    labelText={'Возрастное ограничение'}
                    current={selectData.ageLimit}
                    items={allowedAges}
                    selectHandler={(id) => dispatch(handleAgeLimit(id))}
                />
                <SelectInput
                    labelText={'Максимальное кол-во участников'}
                    current={selectData.duration}
                    items={allowedPeoplesCounts}
                    selectHandler={(id) => dispatch(handleSelectedPeoplesCount(id))}
                />
                <SelectInput
                    labelText={'Способ передвижения на экскурсии'}
                    current={selectData.transport}
                    items={allowedTransports}
                    selectHandler={(id) => dispatch(handleSelectedTransport(id))}
                />
            </div>
            <div className="f-row-betw">
                <UnfilledButton onClick={handlePrevStep} title={'Назад'} />
                <UnfilledButton onClick={handleNextStep} title={'Далее'} />
            </div>
        </div>
    );
};
