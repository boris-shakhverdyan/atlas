import { getImage } from './getImageFromCanvas';

export async function getAvatarForm(previewCanvas: HTMLCanvasElement | null) {
    //const previewCanvas = previewCanvasRef.current;

    if (!previewCanvas) {
        throw new Error('Crop canvas does not exist');
    }

    const photo = (await getImage({
        canvas: previewCanvas,
        width: 150,
        height: 150,
        mime: 'image/jpeg',
        quality: 1,
    })) as Blob;
    const formData = new FormData();

    formData.append('profile_photo', photo, `${Date.now()}_avatar.jpg`);
    return formData;
}
