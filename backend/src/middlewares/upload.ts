import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = (path.extname(file.originalname) || '.jpg').toLowerCase();
        cb(null, uniqueSuffix + ext);
    }
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedMimes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/heic',
        'image/heif',
        'image/avif',
        'application/octet-stream',
    ];

    const isImageMime =
        allowedMimes.includes(file.mimetype) || file.mimetype.startsWith('image/');

    const allowedExts = /^\.(jpe?g|png|gif|webp|heic|heif|avif)$/i;
    const ext = path.extname(file.originalname);
    const isExtMatch = allowedExts.test(ext);

    console.log('[upload]', {
        originalname: file.originalname,
        mimetype: file.mimetype,
        ext,
        isImageMime,
        isExtMatch,
    });

    if (isExtMatch || isImageMime) {
        cb(null, true);
    } else {
        cb(
            new Error(
                `Only image files (JPG, PNG, GIF, WEBP, HEIC, AVIF) are allowed! Got mimetype=${file.mimetype}, ext=${ext}`
            )
        );
    }
};

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 },
});