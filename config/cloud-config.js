import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: 'omotola',
  api_key: '991313721287276',
  api_secret: 'uo8AW97LEU2KQ0AcDj5gH1smwAE'
});

const uploads = file => {
  return new Promise(resolve => {
    cloudinary.uploader.upload(
      file,
      result => {
        resolve({ url: result.url, id: result.public_id });
      },
      { resource_type: 'auto' }
    );
  });
};

export default uploads;
