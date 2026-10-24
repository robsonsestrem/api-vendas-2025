import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import multer from 'multer';

interface IUploadConfig {
  driver: 's3' | 'disk';
  tmpFolder: string;
  directory: string;
  multer: multer.Options;
  config: {
    aws: {
      bucket: string;
    };
  };
}

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');
const tmpFolder = path.resolve(__dirname, '..', '..', 'temp');

[uploadFolder, tmpFolder].forEach((folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
});

const ALLOWED_MIME_TYPES = /^image\/(png|jpe?g|webp|gif)$/;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const uploadConfig: IUploadConfig = {
  driver: (process.env.STORAGE_DRIVER as 's3' | 'disk') || 'disk',
  directory: uploadFolder,
  tmpFolder,
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const safeName = path
          .basename(file.originalname)
          .replace(/[^a-zA-Z0-9._-]/g, '_');

        callback(null, `${fileHash}-${safeName}`);
      },
    }),
    limits: {
      fileSize: MAX_FILE_SIZE,
    },
    fileFilter(request, file, callback) {
      if (!ALLOWED_MIME_TYPES.test(file.mimetype)) {
        callback(
          new Error('Only image files (png, jpg, webp, gif) are allowed.')
        );
        return;
      }

      callback(null, true);
    },
  },
  config: {
    aws: {
      bucket: 'api-vendas',
    },
  },
};

export default uploadConfig;
