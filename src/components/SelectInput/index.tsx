import { FC, useEffect, useRef, useState } from 'react';
import { HasClassName } from '../../types/components.types';
import InputField from '../TextFields/InputField';
import styles from '../../pages/Account/Guide/NewExcursion/newExcursion.module.scss';
import { ArrowDownIcon } from '../../icons';
import SelectDropDown from '../Dropdowns/Select';
import { CustomSpinner } from '../Preloader';

type TSelectInput = {
    items: Array<any>;
    isFocused?: boolean;
    defaultText?: string;
    current?: number;
    loading?: boolean;
    classNameRefBlock?: string;
    selectHandler: (val: number) => void;
    labelText?: string;
    fieldTextKey?: string;
};
const SelectInput: FC<TSelectInput & HasClassName> = ({
    items,
    defaultText = 'Выбрать',
    classNameRefBlock,
    className,
    loading = false,
    selectHandler,
    labelText,
    current = 0,
    isFocused,
    fieldTextKey = 'name',
}) => {
    const [selected, setSelected] = useState<number>(current !== undefined ? current : -1);
    const [focused, setIsFocused] = useState<boolean>(isFocused || false);
    const selectInputRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleFocused = () => {
        setIsFocused(!focused);
    };

    const handleSelected = (val: number) => {
        setSelected(val);
        selectHandler(val);
    };

    const handleClickOutside = (e: any) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            if (selectInputRef.current && !selectInputRef.current.contains(e.target)) {
                setIsFocused(false);
            }
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className={classNameRefBlock} ref={selectInputRef}>
            <InputField
                onClick={toggleFocused}
                wrapperClass={`d-f al-center w-100p pd-20 ${className}`}
                className={'w-100p'}
                inputId={'s'}
                fieldName={labelText || ''}
            >
                <div className="f-row-betw w-100p gap-15">
                    {!loading ? (
                        <input
                            readOnly
                            className={`w-100p ${styles.selectedValue}`}
                            value={
                                selected !== undefined && selected !== 0 && items.length > 0
                                    ? items.find((item) => item.id === selected)[fieldTextKey]
                                    : defaultText
                            }
                        />
                    ) : (
                        <CustomSpinner height={16} width={16} />
                    )}

                    <div
                        style={{ transform: `${focused ? 'rotateZ(180deg)' : 'none'}` }}
                        className="w-content f-c-col"
                    >
                        <ArrowDownIcon />
                    </div>
                </div>
                {focused ? (
                    <div ref={dropdownRef} className={'w-100p p-abs left-0'}>
                        <SelectDropDown
                            current={selected || 0}
                            selectHandler={handleSelected}
                            textFieldName={fieldTextKey}
                            className={`${styles.select} w-100p left-0`}
                            items={items}
                        />
                    </div>
                ) : null}
            </InputField>
        </div>
    );
};

export default SelectInput;
