import { useEffect, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import { canvasPreview } from '../../../../utils/editAvatar/canvasPreview';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { resetEditAvatar, setCrop, setPreviewCrop } from '../../../../features/edit-avatar/main';
import { ASPECT_RATIO, MIN_DIMENSION } from '../settingsAvatar';
import useEditAvatar from '../../../../hooks/useEditAvatar';
import styles from '../editAvatar.module.scss';
import UnfilledButton from '../../../Buttons/UnfilledButton';
import { editAvatarUser, resetEditAvatarStatus } from '../../../../features/profile/profileSlice';
import { handleAvatarEditor } from '../../../../features/modals/modalsSlice';
import { getAvatarForm } from '../../../../utils/editAvatar/getAvatarForm';

export const SetThumbnailModal = () => {
    const dispatch = useAppDispatch();
    const { crop, err, imgSrc, previewCrop } = useAppSelector((state) => state.editAvatar);
    const { editAvatar } = useAppSelector((state) => state.profile);
    const { handleImageLoad } = useEditAvatar();
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    const handlePrevStep = () => {
        dispatch(resetEditAvatar());
    };

    const sendAvatarForm = async () => {
        const formData = await getAvatarForm(previewCanvasRef.current);
        dispatch(editAvatarUser(formData));
    };

    useEffect(() => {
        if (
            previewCrop?.width &&
            previewCrop?.height &&
            imgRef.current &&
            previewCanvasRef.current
        ) {
            canvasPreview(imgRef.current, previewCanvasRef.current, previewCrop);
        }
    }, [previewCrop, crop]);
    useEffect(() => {
        if (editAvatar.success) {
            dispatch(handleAvatarEditor());
            dispatch(resetEditAvatar());
            dispatch(resetEditAvatarStatus());
        }
    }, [editAvatar.success, dispatch]);

    return (
        <div className={'f-column gap-30 f-1'}>
            {!err && imgSrc && crop !== null ? (
                <div className={`w-100p f-c-col ${styles.imageArea}`}>
                    <ReactCrop
                        crop={crop}
                        onComplete={(c) => dispatch(setPreviewCrop(c))}
                        circularCrop
                        keepSelection
                        aspect={ASPECT_RATIO}
                        minWidth={MIN_DIMENSION}
                        onChange={(pixelCrop, percentCrop) => {
                            dispatch(setCrop(percentCrop));
                        }}
                    >
                        <img
                            style={{ maxHeight: 400 }}
                            ref={imgRef}
                            onLoad={(e) => handleImageLoad(e)}
                            src={imgSrc}
							alt='some'
                        />
                    </ReactCrop>
                </div>
            ) : null}
            {previewCrop ? (
                <div className={`d-f al-center gap-20 ${styles.avatarArea}`}>
                    <canvas
                        ref={previewCanvasRef}
                        style={{
                            borderRadius: 1000,
                            border: '1px solid lightgray',
                            objectFit: 'contain',
                            width: MIN_DIMENSION,
                            height: MIN_DIMENSION,
                        }}
                    />
                    <p className={styles.yourAvatarText}>Ваш аватар</p>
                </div>
            ) : (
                <p>Выделите подходящую область!</p>
            )}
            <div className="w-100p f-1 f-row-betw gap-30">
                <UnfilledButton
                    onClick={handlePrevStep}
                    className={`f-1 ${styles.backbtn}`}
                    title={'Назад'}
                />
                <UnfilledButton
                    disabled={previewCrop === null}
                    onClick={sendAvatarForm}
                    className={'f-1'}
                    title={'Сохранить'}
                />
            </div>
        </div>
    );
};
