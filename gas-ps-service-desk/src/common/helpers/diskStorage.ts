import { diskStorage } from 'multer';
import { extname } from 'path';

export const storage = diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + extname(file.originalname))
  },
})