import { UploadFileModal } from './UploadFileModal'
import styles from './editAvatar.module.scss'
import { CloseIcon } from '../../../icons'
import ShadowWrapper from '../../ShadowWrapper'
import ModalBody from '../ModalBody'
import 'react-image-crop/dist/ReactCrop.css'
import { SetThumbnailModal } from './SetThumbnailModal'
import { useAppSelector } from '../../../app/hooks'
import { useDispatch } from 'react-redux'
import { handleAvatarEditor } from '../../../features/modals/modalsSlice'

const steps = [
    UploadFileModal,
    SetThumbnailModal
]

export const EditAvatar = () => {
    const dispatch = useDispatch()
    const { step } = useAppSelector(state => state.editAvatar)
    const EditAvatarStep = steps[step]
    const handleAvatar = () => dispatch(handleAvatarEditor())

    return <ShadowWrapper onClick={handleAvatar}>
        <ModalBody className={`${styles.editAvatarWindow} f-column-betw`}>
            <div onClick={handleAvatar} className="f-c-col w-content p-abs modalCloseBtn">
                <CloseIcon width={24} height={24} />
            </div>
            <h2 className="section-subtitle">Фото профиля</h2>
            <EditAvatarStep />
        </ModalBody>
    </ShadowWrapper>
}
