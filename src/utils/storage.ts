import * as path from 'path';
import { diskStorage } from 'multer';

export function storageDir() {
  return path.join(__dirname, '../../../storage');
}

export function multerStorage(dest: string) {
  return diskStorage({
    destination: (req, file, cb) => cb(null, dest),
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}.jpg`);
    },
  });
}
