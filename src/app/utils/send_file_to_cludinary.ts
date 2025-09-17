import { v2 as cloudinary } from 'cloudinary';

export const send_img_file_to_cloudinary = async () => {
  // configure only once (better move this to a config file)
  cloudinary.config({
    cloud_name: config.CLOUDINARY_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET
  });

  try {
    const result = await cloudinary.uploader.upload(
      'https://upload.wikimedia.org/wikipedia/commons/d/d3/Soccerball.svg',
      {
        public_id: 'my_dog',
        overwrite: true, // replace if already exists
      }
    );

    console.log('✅ Upload successful!');
    console.log('Secure URL:', result); // <-- Cloudinary image link
    return result;
  } catch (err) {
    console.error('❌ Upload failed:', err);
    throw err;
  }
};
