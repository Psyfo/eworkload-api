// import path from 'path';
import fs from 'fs';
import { sync } from 'mkdirp';
// import { generate } from 'shortid';
import Upload from '../models/upload';
import * as UserMethods from './user';
import cloudinary from 'cloudinary';
// import url from 'url';
import Activity from '../models/activity/activity';
import AcademicAdministrationActivity from '../models/activity/academic-administration-activity';
import ResearchActivity from '../models/activity/research-activity';
// import { AWS } from 'aws-sdk';

cloudinary.config({
  cloud_name: 'omotola',
  api_key: '991313721287276',
  api_secret: 'uo8AW97LEU2KQ0AcDj5gH1smwAE'
});

// AWS.config.update({
//   accessKeyId: 'AKIAINP7XYSC2Q7XC4VQ',
//   secretAccessKey: 'HyeCUVzysrP4ZDDm1BmlErzzBcJSBKcKUb3'
// });

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

// Evidence
const uploadEvidence = async (file, activityId) => {
  const { createReadStream, filename, mimetype, encoding } = await file;
  const stream = createReadStream();

  const { id, path } = await storeEvidenceFS({ stream, filename, activityId });
  const evidenceUrl = `http://127.0.0.1:5000/${path}`;
  await Activity.findOneAndUpdate(
    { activityId: activityId },
    { $set: { evidence: evidenceUrl } },
    { upsert: true }
  );

  return await storeDB({ id, filename, mimetype, path });
};
const uploadAcademicAdministrationEvidence = async (file, activityId) => {
  const { createReadStream, filename, mimetype, encoding } = await file;
  const stream = createReadStream();

  const { id, path } = await storeEvidenceFS({ stream, filename, activityId });
  const evidenceUrl = `http://127.0.0.1:5000/${path}`;
  await AcademicAdministrationActivity.findOneAndUpdate(
    { activityId: activityId },
    { $set: { evidence: evidenceUrl } },
    { upsert: true }
  );

  return await storeDB({ id, filename, mimetype, path });
};
const uploadResearchEvidence = async (file, activityId) => {
  const { createReadStream, filename, mimetype, encoding } = await file;
  const stream = createReadStream();

  const { id, path } = await storeEvidenceFS({ stream, filename, activityId });
  const evidenceUrl = `http://127.0.0.1:5000/${path}`;
  await ResearchActivity.findOneAndUpdate(
    { activityId: activityId },
    { $set: { evidence: evidenceUrl } },
    { upsert: true }
  );

  return await storeDB({ id, filename, mimetype, path });
};

const storeEvidenceFS = ({ stream, filename, evidenceId }) => {
  const id = evidenceId;
  // const path = `${uploadDir}/${id}-${filename}`;
  const path = `${uploadEvidenceDir}/${filename}`;

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

// Images
const uploadProfilePicture = async (file, userId) => {
  const { createReadStream, filename, mimetype, encoding } = await file;
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
// const s3 = new AWS.S3();

// const storeProfPicCloud = ({ stream, filename, userId }) => {
//   const id = userId;
// };

export {
  files,
  uploadProfilePicture,
  uploadEvidence,
  uploadAcademicAdministrationEvidence,
  uploadResearchEvidence
};
