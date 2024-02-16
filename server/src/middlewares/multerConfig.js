import multer from 'multer';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));


export const upload = multer({
    storage: multer.diskStorage({
        destination: join(CURRENT_DIR, '../uploads'),
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname);
        }
    }),
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/webp") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg , .jpeg , and .webp format allowed!'));
        }
    }
});

