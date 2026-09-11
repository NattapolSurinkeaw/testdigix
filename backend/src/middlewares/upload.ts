import multer from 'multer';
import path from 'path';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'application/octet-stream'];
    const isImageMime = allowedMimes.includes(file.mimetype) || file.mimetype.startsWith('image/');

    const allowedExts = /jpeg|jpg|png|gif|webp/;
    const isExtMatch = allowedExts.test(path.extname(file.originalname).toLowerCase());

    if (isExtMatch || isImageMime) {
        cb(null, true);
    } else {
        cb(new Error('Only image files (JPG, PNG, GIF, WEBP) are allowed!'));
    }
};

export const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // ⚠️ ตัด dest: 'uploads/' ออกเพราะใช้ storage แล้ว
});