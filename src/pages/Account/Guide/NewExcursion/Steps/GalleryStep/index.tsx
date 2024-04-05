import { useContext, ChangeEvent } from 'react';
import { ExcursionFormContext } from '../..';
import { useAppSelector, useAppDispatch } from '../../../../../../app/hooks';
import UnfilledButton from '../../../../../../components/Buttons/UnfilledButton';
import InputField from '../../../../../../components/TextFields/InputField';
import {
    addGalleryItem,
    editGalleryItem,
    deleteGalleryItem,
} from '../../../../../../features/excursion-form/excursionFormSlice';
import { EditIcon, DeleteIcon } from '../../../../../../icons';
import styles from '../../newExcursion.module.scss';

export const GalleryStep = () => {
    const { handleNextStep, handlePrevStep } = useContext(ExcursionFormContext);
    const { gallery } = useAppSelector((state) => state.excursionForm.data);
    const dispatch = useAppDispatch();

    const handleAddGalleryItem = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.item(0);
        if (file) {
            console.log(gallery);
            const url = URL.createObjectURL(file);
            dispatch(addGalleryItem({ src: url, file: file }));
        }
    };

    const handleEditImageGalleryItem = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.item(0);
        if (file) {
            const url = URL.createObjectURL(file);
            dispatch(
                editGalleryItem({
                    index: index,
                    val: url,
                    prop: 'src',
                }),
            );
        }
    };

    return (
        <div className={'f-column gap-25'}>
            <div className="section-subtitle">Галерея эскурсии</div>
            <div className="f-column gap-30">
                <div className={'f-column gap-5 w-content'}>
                    <p className={styles.caption}>(Минимум 3 фото)</p>
                    <label htmlFor={'galleryInput'} onClick={() => {}} className={'w-content'}>
                        <UnfilledButton asBlock={true} title={'+ Добавить фото'} />
                    </label>
                    <input
                        onChange={handleAddGalleryItem}
                        accept={'image/png, image/jpeg'}
                        id={'galleryInput'}
                        type="file"
                        className={'d-f hidden'}
                    />
                </div>
                <div className={`${styles.galleryItems} f-row-betw gap-30 flex-wrap`}>
                    {gallery.map((item, index) => (
                        <div className={`${styles.galleryItem} w-100p f-column gap-15`}>
                            <input
                                id={`galleryInputEdit-${index}`}
                                onChange={(e) => handleEditImageGalleryItem(e, index)}
                                accept={'image/png, image/jpeg'}
                                type="file"
                                className={'d-n hidden'}
                            />
                            <div className={`${styles.imageWrapper} w-100p  h-100p`}>
                                <div
                                    style={{ backgroundImage: `url(${item.src})` }}
                                    className={`${styles.image}  bg-cover`}
                                >
                                    <label
                                        htmlFor={`galleryInputEdit-${index}`}
                                        className={`f-c-col ${styles.edit}`}
                                    >
                                        <EditIcon />
                                    </label>
                                    <div
                                        onClick={() => dispatch(deleteGalleryItem(index))}
                                        className={`f-c-col ${styles.delete}`}
                                    >
                                        <DeleteIcon strokeColor={'red'} height={18} />
                                    </div>
                                </div>
                            </div>
                            <InputField
                                defaultValue={item.description}
                                wrapperClass={'d-f al-end w-100p pd-20'}
                                className={'w-100p'}
                                inputId={'s'}
                                fieldName={'Описание к экскурсии'}
                            >
                                <input
                                    placeholder={'Название...'}
                                    onChange={(e) =>
                                        dispatch(
                                            editGalleryItem({
                                                index,
                                                prop: 'description',
                                                val: e.target.value,
                                            }),
                                        )
                                    }
                                    className={`f-1`}
                                />
                            </InputField>
                        </div>
                    ))}
                </div>
            </div>
            <div className="f-row-betw">
                <UnfilledButton onClick={handlePrevStep} title={'Назад'} />
                <UnfilledButton onClick={handleNextStep} title={'Далее'} />
            </div>
        </div>
    );
};
