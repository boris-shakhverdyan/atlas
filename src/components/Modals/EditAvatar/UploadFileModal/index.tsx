import styles from '../editAvatar.module.scss'
import UnfilledButton from '../../../Buttons/UnfilledButton'
import { useAppSelector } from '../../../../app/hooks'
import useEditAvatar from '../../../../hooks/useEditAvatar'

export const UploadFileModal = () => {
  const { err } = useAppSelector(state => state.editAvatar)
  const { handleUploadFile } = useEditAvatar()
  return (
    <>
      <p className={styles.description}>
        Вас будет проще узнать, если вы загрузите свою настоящую фотографию. Вы можете загрузить изображение в формате JPG или PNG.
      </p>
      <div className="w-100 d-f jc-center">
        <input id={"avatar"} className={"d-n"} type={"file"} onChange={e => handleUploadFile(e)} accept={"image/*"} />
        <label htmlFor={"avatar"}>
          <UnfilledButton asBlock={true} className={`${styles.uploadStepBtn} w-100p f-1`} title={"Загрузить фото"} />
        </label>
      </div>
      {err ? <p className={`errColor txt-center ${styles.errUpload}`}>{err}</p> : null}

    </>
  )
}
