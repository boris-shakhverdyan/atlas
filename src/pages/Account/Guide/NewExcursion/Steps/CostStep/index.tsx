import { useContext } from 'react';
import { ExcursionFormContext } from '../..';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import UnfilledButton from '../../../../../../components/Buttons/UnfilledButton';
import { CustomSpinner } from '../../../../../../components/Preloader';
import SelectInput from '../../../../../../components/SelectInput';
import InputField from '../../../../../../components/TextFields/InputField';
import {
    excursionCreate,
    handleSelectedCostType,
    setCost,
} from '../../../../../../features/excursion-form/excursionFormSlice';
import { ExcursionsCreateRequest } from '../../../../../../types/api/excursion.api.types';

export const CostStep = () => {
    const dispatch = useAppDispatch();
    const { handlePrevStep } = useContext(ExcursionFormContext);
    const {
        data,
        selectData,
        allowedCostTypes,
        cost,
        textData,
        allowedAges,
        allowedLoadings,
        allowedDurations,
        allowedPeoplesCounts,
        main_photo,
        sending,
    } = useAppSelector((state) => state.excursionForm);
    const { profile } = useAppSelector((state) => state);

    const selectDataIsValid = Object.keys(selectData).some((key) => {
        const typedKey = key as keyof typeof selectData;
        return selectData[typedKey] !== 0;
    });
    const textDataIsValid = Object.keys(textData).some((key) => {
        const typedKey = key as keyof typeof textData;
        return textData[typedKey].length > 0;
    });
    const arraysDataIsNotValid = Object.keys(data).some((key) => {
        const typedKey = key as keyof typeof data;
        return data[typedKey].length < 1;
    });

    const costIsValid = !isNaN(Number(cost));
    const validFormData =
        selectDataIsValid && textDataIsValid && costIsValid && !arraysDataIsNotValid;

    const handleCreateExcursion = () => {
        const photosFiles: File[] = [];
        const photosTitles: string[] = [];
        const durationVal = allowedDurations.find((item) => item.id === selectData.duration)?.val;
        const peoplesCountVal = allowedPeoplesCounts.find(
            (item) => item.id === selectData.peoplesCount,
        )?.val;
        const ageLimitVal = allowedAges.find((item) => item.id === selectData.ageLimit)?.val;

        data.gallery.forEach((item) => {
            if (item.file !== null) {
                photosFiles.push(item.file);
            }
        });
        data.gallery.forEach((item) => {
            if (item.description !== undefined) {
                photosTitles.push(item.description);
            }
        });
        const formData = new FormData();

        const req: ExcursionsCreateRequest = {
            photos: photosFiles,
            titles: photosTitles,
            main_photo: main_photo.file as File,
            languages: [1],
            categories: [selectData.category],
            guide: Number(profile.data.id),
            duration: Number(durationVal),
            people_limit: Number(peoplesCountVal),
            transport: Number(selectData.transport),
            cost: cost,
            ex_type: selectData.typeExcursion,
            title: textData.title,
            slogan: textData.slogan,
            description: textData.description,
            city: selectData.city,
            age_limit: Number(ageLimitVal),
            locations: data.locations,
            details: data.details,
            important: data.needKnow,
            payment_type: Number(selectData.costType),
        };

        formData.append('languages', String(req.languages[0]));
        formData.append('categories', String(req.categories[0]));
        formData.append('title', req.title);
        formData.append('slogan', req.slogan);
        formData.append('description', req.description);
        formData.append('main_photo', req.main_photo);
        formData.append('cost', req.cost);

        formData.append('guide', String(req.guide));
        formData.append('duration', String(req.duration));
        formData.append('people_limit', String(req.people_limit));
        formData.append('transport', String(req.transport));
        formData.append('payment_type', String(req.payment_type));
        formData.append('ex_type', String(req.ex_type));
        formData.append('city', String(req.city));
        formData.append('age_limit', String(req.age_limit));

        req.photos.forEach((photo, index) => {
            formData.append(`photos[${index}]`, photo);
        });
        req.titles.forEach((title, index) => {
            formData.append(`titles[${index}]`, title);
        });

        dispatch(excursionCreate({ form: formData, data: req }));
    };

    return (
        <div className={'f-column gap-25'}>
            <div className="section-subtitle">Стоимость</div>
            <div className="formArea gap-30 f-column">
                {/* <SelectInput labelText={"Тип стоимости"} current={selected} items={["За человека", "За экскурсию"]}
                             selectHandler={handleSelected}/> */}
                <SelectInput
                    loading={allowedLoadings.cost_types}
                    labelText={'Тип стоимости'}
                    current={selectData.costType}
                    items={allowedCostTypes}
                    selectHandler={(id) => dispatch(handleSelectedCostType(id))}
                />
                <InputField
                    inputType={'number'}
                    wrapperClass={'d-f al-end w-100p pd-20'}
                    className={'w-100p'}
                    inputId={'s'}
                    fieldName={'Стоимость на руки (руб.)'}
                >
                    <input
                        type={'text'}
                        min={100}
                        value={cost}
                        onChange={(e) => dispatch(setCost(e.target.value))}
                        placeholder={'2500'}
                        className={`f-1`}
                    />
                </InputField>
            </div>
            <div className="f-column w-100p gap-10">
                <div className="f-row-betw">
                    <UnfilledButton onClick={handlePrevStep} title={'Назад'} />
                    {sending.loading ? (
                        <CustomSpinner height={20} width={20} />
                    ) : (
                        <UnfilledButton
                            disabled={!validFormData}
                            onClick={handleCreateExcursion}
                            title={'Создать экскурсию'}
                        />
                    )}
                </div>
                {!validFormData ? (
                    <p className="errColor txt-right">
                        Не заполнены обязательные поля. Проверьте все пункты!
                    </p>
                ) : null}
            </div>
        </div>
    );
};
