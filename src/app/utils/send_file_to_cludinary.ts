import { v2 as cloudinary } from 'cloudinary';

export const send_img_file_to_cloudinary = async () => {
  // configure only once (better move this to a config file)
  cloudinary.config({
    cloud_name: 'dz28duolk',
    api_key: '115141379594145',
    api_secret: 'LKj7hgo_9ivUOAiefGOY6NRYCQc',
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
