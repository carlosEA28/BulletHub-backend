import multer from "multer";

const { memoryStorage } = multer;

export const upload = multer({
    storage: memoryStorage(),
    limits: { fieldSize: 5 * 1024 * 1024 },
});
