import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
// configure ONCE (outside the function)
cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

export const send_img_file_to_cloudinary = async (
  image_file_path: string,
  public_id: string,
) => {
  try {
    const result = await cloudinary.uploader.upload(image_file_path, {
      public_id,
      overwrite: true,
    });

    fs.unlink(image_file_path, (err) => {
      if (err) {
        console.error('⚠️ Failed to delete local file:', err);
      } else {
        console.log('🗑️ Local file deleted successfully');
      }
    });

    return result;
  } catch (err) {
    console.error('❌ Upload failed:', err);
    throw err;
  }
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), 'uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

export const upload = multer({ storage });
