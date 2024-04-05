import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
    ASPECT_RATIO,
    MAX_FILE_SIZE,
    MIN_DIMENSION,
} from '../components/Modals/EditAvatar/settingsAvatar';
import { resetCrop, setCrop, setErr, setImgSrc, setStep } from '../features/edit-avatar/main';
import { makeAspectCrop, centerCrop } from 'react-image-crop';

type UseEditAvatarHook = {
    handleUploadFile: (e: ChangeEvent<HTMLInputElement>) => any;
    handleImageLoad: (e: any) => any;
};
const useEditAvatar = (): UseEditAvatarHook => {
    const dispatch = useAppDispatch();
    const { err, step } = useAppSelector((state) => state.editAvatar);
    const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            dispatch(setErr('Размер файла не должен превышать 5 мб!'));
            return;
        }
        dispatch(resetCrop());
        const reader = new FileReader();

        reader.addEventListener('load', () => {
            const imageElement = new Image();
            const imageURL = reader.result?.toString() || '';
            imageElement.src = imageURL;

            imageElement.addEventListener('load', (e: any) => {
                if (err) {
                    dispatch(setErr(''));
                }
                const { naturalWidth, naturalHeight } = e.currentTarget as {
                    width: number;
                    naturalWidth: number;
                    height: number;
                    naturalHeight: number;
                };
                if (naturalHeight < MIN_DIMENSION || naturalWidth < MIN_DIMENSION) {
                    dispatch(setErr('Слишком маленький размер изображения!'));
                    dispatch(setImgSrc(''));
                    return;
                }
                handleImageLoad(e);
            });

            dispatch(setImgSrc(imageURL));
        });
        reader.readAsDataURL(file);
        if (!step) {
            dispatch(setStep(1));
        }
    };
    const handleImageLoad = (e: any) => {
        const { width, height } = e.currentTarget as {
            width: number;
            height: number;
        };
        const newCrop = makeAspectCrop(
            {
                unit: '%',
                width: 32,
            },
            ASPECT_RATIO,
            width,
            height,
        );
        // const newPreviewCrop = makeAspectCrop(
        //     {
        //         unit: 'px',
        //         width: MIN_DIMENSION,
        //     },
        //     ASPECT_RATIO,
        //     width,
        //     height,
        // );

        const centeredCrop = centerCrop(newCrop, width, height);
        dispatch(setCrop(centeredCrop));
    };
    return {
        handleImageLoad,
        handleUploadFile,
    };
};

export default useEditAvatar;
