export async function getImage({
    canvas,
    width,
    height,
    mime = 'image/jpeg',
    quality = 0.8,
}: {
    canvas: any;
    width: number;
    height: number;
    mime: string;
    quality: number;
}) {
    return new Promise((resolve) => {
        const tmpCanvas = document.createElement('canvas');
        tmpCanvas.width = width;
        tmpCanvas.height = height;

        const ctx = tmpCanvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, width, height);
        }
        tmpCanvas.toBlob(resolve, mime, quality);
    });
}
