import fs from 'fs';
import { sync } from 'mkdirp';
import Upload from './../models/upload';
import * as UserMethods from './user';
import Evidence from './../models/evidence';
import AcademicAdministrationActivity from './../models/activity/academic-administration-activity';
import ResearchActivity from './../models/activity/research-activity';
import cloudinary from 'cloudinary';
import AWS from 'aws-sdk';

// CLOUDINARY CONFIG
cloudinary.config({
  cloud_name: 'omotola',
  api_key: '991313721287276',
  api_secret: 'uo8AW97LEU2KQ0AcDj5gH1smwAE'
});

// AWS CONFIG
AWS.config.update({
  accessKeyId: 'AKIAI7XLMUA3NG3KULBQ',
  secretAccessKey: ' 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'
});
AWS.config.region = 'us-east-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-east-2:58fe6e31-acd9-40f5-a9c1-34584e333dbc'
});

// AWS Upload Evidence
const uploadEvidenceAWS = async (file, userId, activityId) => {
  const { createReadStream, filename, mimetype } = await file;
  const stream = createReadStream();

  // Configure S3
  const params = {
    Bucket: 'eworkload',
    Key: `evidence/${filename}`, // File name you want to save as in S3
    Body: stream,
    ACL: 'public-read',
    ContentType: mimetype
  };
  const s3 = new AWS.S3({
    accessKeyId: 'AKIAI7XLMUA3NG3KULBQ',
    secretAccessKey: '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',
    region: 'us-east-2'
  });

  // Upload files to the bucket
  return await s3.upload(params, async function(err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
    await Evidence.findOneAndUpdate(
      { activityId: activityId },
      { $set: { activityId: activityId, evidence: data.Location } },
      { upsert: true }
    );
    console.log('Evidence updated');

    return { location: data.Location };
  });
};
// AWS Upload Academic Administration Activity Evidence
const uploadAcademicAdministrationEvidenceAWS = async (
  file,
  userId,
  activityId
) => {
  const { createReadStream, filename, mimetype } = await file;
  const stream = createReadStream();

  // Configure S3
  const params = {
    Bucket: 'eworkload',
    Key: `${userId}/evidence/academic-administration/${filename}`, // File name you want to save as in S3
    Body: stream,
    ACL: 'public-read',
    ContentType: mimetype
  };
  const s3 = new AWS.S3({
    accessKeyId: 'AKIAI7XLMUA3NG3KULBQ',
    secretAccessKey: '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',
    region: 'us-east-2'
  });

  // Upload files to the bucket
  return await s3.upload(params, async function(err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
    await AcademicAdministrationActivity.findOneAndUpdate(
      { activityId: activityId },
      { $set: { evidence: data.Location } },
      { upsert: true }
    );
    console.log('Academic Administration evidence updated');

    return { location: data.Location };
  });
};
// AWS Upload Research Activity Evidence
const uploadResearchEvidenceAWS = async (file, userId, activityId) => {
  const { createReadStream, filename, mimetype } = await file;
  const stream = createReadStream();

  // Configure S3
  const params = {
    Bucket: 'eworkload',
    Key: `${userId}/evidence/research/${filename}`, // File name you want to save as in S3
    Body: stream,
    ACL: 'public-read',
    ContentType: mimetype
  };
  const s3 = new AWS.S3({
    accessKeyId: 'AKIAI7XLMUA3NG3KULBQ',
    secretAccessKey: '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',
    region: 'us-east-2'
  });

  // Upload files to the bucket
  return await s3.upload(params, async function(err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
    await ResearchActivity.findOneAndUpdate(
      { activityId: activityId },
      { $set: { evidence: data.Location } },
      { upsert: true }
    );
    console.log('Research evidence updated');

    return { location: data.Location };
  });
};

// AWS Upload Profile Pic
const uploadProfilePictureAWS = async (file, userId) => {
  const { createReadStream, filename, mimetype } = await file;
  const stream = createReadStream();

  // Configure S3
  const params = {
    Bucket: 'eworkload',
    Key: `${userId}/profile-img/${filename}`, // File name you want to save as in S3
    Body: stream,
    ACL: 'public-read',
    ContentType: mimetype
  };
  const s3 = new AWS.S3({
    accessKeyId: 'AKIAI7XLMUA3NG3KULBQ',
    secretAccessKey: '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',
    region: 'us-east-2'
  });

  // Upload files to the bucket
  return await s3.upload(params, async (err, data) => {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
    // Update user photourl
    const update = await UserMethods.assignProfilePicture(
      userId,
      data.Location
    );
    console.log('User photoUrl updated: ', update);
    return { location: data.Location };
  });
};

//const uploadDir = path.resolve(__dirname, '../uploads');
const uploadProfPicDir = 'uploads/images';
const uploadEvidenceDir = 'uploads/evidence';

// Ensure upload directory exists
sync(uploadProfPicDir);
sync(uploadEvidenceDir);

// QUERIES
const files = async () => {
  return await Upload.find({});
};

// MUTATIONS
const storeDB = async file => {
  const { id, filename, mimetype, path } = file;

  try {
    let file = new Upload({ id, filename, mimetype, path });
    return await file.save();
  } catch (err) {
    return err;
  }
};

// Images
const uploadProfilePicture = async (file, userId) => {
  const { createReadStream, filename, mimetype } = await file;
  const stream = await createReadStream();

  const { id, path } = await storeProfPicFS({ stream, filename, userId });

  const photoUrl = `http://127.0.0.1:5000/${path}`;
  await UserMethods.assignProfilePicture(userId, photoUrl);

  return await storeDB({ id, filename, mimetype, path });
};
const storeProfPicFS = ({ stream, filename, userId }) => {
  const id = userId;
  // const path = `${uploadDir}/${id}-${filename}`;
  const path = `${uploadProfPicDir}/${id}-${filename}`;
  console.log('ID:', id);
  console.log('Path:', path);

  return new Promise((resolve, reject) =>
    stream
      .on('error', error => {
        if (stream.truncated) fs.unlinkSync(path);
        reject(error);
      })
      .pipe(fs.createWriteStream(path))
      .on('error', error => reject(error))
      .on('finish', () => resolve({ id, path }))
  );
};

export {
  files,
  uploadProfilePicture,
  uploadProfilePictureAWS,
  uploadEvidenceAWS,
  uploadAcademicAdministrationEvidenceAWS,
  uploadResearchEvidenceAWS
};
