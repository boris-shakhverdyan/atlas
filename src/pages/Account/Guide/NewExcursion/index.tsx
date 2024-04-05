import { createContext, useEffect, useRef, useState } from 'react';
import SidePartLayout from '../../../../layouts/SidePartLayout';
import NewExcursionBar from '../../../../components/SideBar/NewExcursion';
import styles from './newExcursion.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
    getAllCategories,
    getAllCities,
    getExKinds,
    getExPaymentTypes,
    getTransports,
    resetForm,
} from '../../../../features/excursion-form/excursionFormSlice';
import { FormMenuIcon } from '../../../../icons';
import { useNavigate } from 'react-router-dom';
import { CostStep } from './Steps/CostStep';
import { DescriptionStep } from './Steps/DescriptionStep';
import { GalleryStep } from './Steps/GalleryStep';
import { MainStep } from './Steps/MainStep';
import { WayStep } from './Steps/WayStep';

export interface StepType {
    name: string;
    Component: () => JSX.Element;
}

const steps: Array<StepType> = [
    {
        name: 'Описание',
        Component: DescriptionStep,
    },
    {
        name: 'Маршрут',
        Component: WayStep,
    },
    {
        name: 'Фотографии',
        Component: GalleryStep,
    },
    {
        name: 'Основные',
        Component: MainStep,
    },
    {
        name: 'Стоимость',
        Component: CostStep,
    },
];

export const ExcursionFormContext = createContext({
    handlePrevStep: () => {},
    handleNextStep: () => {},
});

const ExcursionFormContainer = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { sending } = useAppSelector((state) => state.excursionForm);
    const [menuExcursionOpened, setMenuExcursionOpened] = useState(false);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const StepComponent = steps[currentStep].Component;

    const selectInputRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleMenuOpened = () => {
        setMenuExcursionOpened((prev) => !prev);
    };
    const handlePrevStep = () => setCurrentStep((prev) => prev - 1);

    const handleNextStep = () => setCurrentStep((prev) => prev + 1);

    const handleClickOutside = (e: any) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            if (selectInputRef.current && !selectInputRef.current.contains(e.target)) {
                setMenuExcursionOpened(false);
            }
        }
    };

    const handleSelectStep = (step: number) => {
        setCurrentStep(step);
        setMenuExcursionOpened(false);
    };

    useEffect(() => {
        if (!sending.loading && sending.success) {
            dispatch(resetForm());
            navigate('/created-successfully');
        }
    }, [sending.loading, sending.success, dispatch, navigate]);

    useEffect(() => {
        dispatch(getExKinds());
        dispatch(getAllCategories());
        dispatch(getAllCities());
        dispatch(getTransports());
        dispatch(getExPaymentTypes());

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [dispatch]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentStep]);

    return (
        <ExcursionFormContext.Provider value={{ handlePrevStep, handleNextStep }}>
            <div className="f-column ">
                <SidePartLayout
                    afterContent={
                        <div
                            ref={selectInputRef}
                            className={`${styles.formExcursionMenuBtn} bx-shadow d-f al-center gap-10 p-rel`}
                        >
                            <div onClick={toggleMenuOpened} className={'d-f al-center gap-10'}>
                                <FormMenuIcon strokeColor={'#D900b6'} height={28} width={28} />
                                <p>Меню</p>
                            </div>

                            <div
                                ref={dropdownRef}
                                className={`${styles.formExcursionMenu} ${
                                    menuExcursionOpened ? styles.formExcursionMenuOpened : null
                                }  t-transform-4 bg-white f-column gap-5 pd-10 p-abs `}
                            >
                                {steps.map((step, index) => (
                                    <div
                                        onClick={
                                            index !== currentStep
                                                ? () => handleSelectStep(index)
                                                : undefined
                                        }
                                        className={`${styles.formExcursionMenuItem} ${
                                            index === currentStep ? 'colorPurple' : null
                                        }`}
                                    >
                                        {step.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                    backLink={'/profile'}
                    defaultTitle={'Новая экскурсия'}
                    backText={'В личный кабинет'}
                    tabsContent={
                        <NewExcursionBar
                            currentTab={currentStep}
                            setCurrentTab={setCurrentStep}
                            tabs={steps.map((step) => {
                                return { name: step.name };
                            })}
                        />
                    }
                >
                    <StepComponent />
                </SidePartLayout>
            </div>
        </ExcursionFormContext.Provider>
    );
};

export default ExcursionFormContainer;
