import AWS from 'aws-sdk';
import fs from 'fs';
import { sync } from 'mkdirp';

import AcademicAdministrationActivity from '../models/activity/academic-administration-activity.model';
import ResearchActivity from '../models/activity/research-activity.model';
import Upload from '../models/upload.model';
import UserController from './user.controller';

// AWS CONFIG
AWS.config.update({
  accessKeyId: 'AKIAJS6HEGWGJTMTSNGQ',
  secretAccessKey: '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'
});

//const uploadDir = path.resolve(__dirname, '../uploads');
const uploadProfPicDir = 'uploads/images';
const uploadEvidenceDir = 'uploads/evidence';

// Ensure upload directory exists
sync(uploadProfPicDir);
sync(uploadEvidenceDir);

export default class UploadController {
  public static async uploadAcademicAdministrationEvidenceAWS(
    file: any,
    userId: string,
    activityId: string
  ) {
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
    const s3 = await new AWS.S3({
      accessKeyId: 'AKIAJS6HEGWGJTMTSNGQ',
      secretAccessKey: '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',
      region: 'eu-west-2'
    });

    // Upload files to the bucket
    return await s3.upload(params, async function(err: any, data: any) {
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
  }
  public static async uploadResearchEvidenceAWS(
    file: any,
    userId: string,
    activityId: string
  ) {
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
    const s3 = await new AWS.S3({
      accessKeyId: 'AKIAJS6HEGWGJTMTSNGQ',
      secretAccessKey: '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',
      region: 'eu-west-2'
    });

    // Upload files to the bucket
    return new Promise((resolve, reject) => {
      return s3.upload(params, async (err: any, data: any) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        if (data) {
          console.log(`File uploaded successfully. ${data.Location}`);

          // Update evidence url on activity
          await ResearchActivity.findOneAndUpdate(
            { activityId: activityId },
            { $set: { evidence: data.Location } },
            { upsert: true }
          );
          console.log('Research evidence updated');
          return resolve(data.Location);
        }
      });
    });
  }
  public static async uploadProfilePictureAWS(file: any, userId: string) {
    const { createReadStream, filename, mimetype } = await file;
    const stream = await createReadStream();

    // Configure S3
    const params = {
      Bucket: 'eworkload',
      Key: `${userId}/profile-img/${filename}`, // File name you want to save as in S3
      Body: stream,
      ACL: 'public-read',
      ContentType: mimetype
    };
    const s3 = await new AWS.S3({
      accessKeyId: 'AKIAJS6HEGWGJTMTSNGQ',
      secretAccessKey: '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',
      region: 'eu-west-2'
    });

    // Upload files to the bucket
    return new Promise((resolve, reject) => {
      return s3.upload(params, async (err: any, data: any) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        if (data) {
          console.log(`File uploaded successfully. ${data.Location}`);

          // Update user photourl
          const update = await UserController.assignProfilePicture(
            userId,
            data.Location
          );

          console.log('User photoUrl updated: ', update);
          return resolve(data.Location);
        }
      });
    });
  }
  public static async files() {
    return await Upload.find({});
  }
  public static async storeDB(file: any) {
    const { id, filename, mimetype, path } = file;

    try {
      let file = new Upload({ id, filename, mimetype, path });
      return await file.save();
    } catch (err) {
      return err;
    }
  }
  public static async uploadProfilePicture(file: any, userId: string) {
    const { createReadStream, filename, mimetype } = await file;
    const stream = await createReadStream();

    const { id, path }: any = await this.storeProfPicFS({
      stream,
      filename,
      userId
    });

    const photoUrl = `http://127.0.0.1:5000/${path}`;
    await UserController.assignProfilePicture(userId, photoUrl);

    return await this.storeDB({ id, filename, mimetype, path });
  }
  public static async storeProfPicFS({ stream, filename, userId }: any) {
    const id = userId;
    // const path = `${uploadDir}/${id}-${filename}`;
    const path = `${uploadProfPicDir}/${id}-${filename}`;
    console.log('ID:', id);
    console.log('Path:', path);

    return new Promise((resolve, reject) =>
      stream
        .on('error', (error: any) => {
          if (stream.truncated) fs.unlinkSync(path);
          reject(error);
        })
        .pipe(fs.createWriteStream(path))
        .on('error', (error: any) => reject(error))
        .on('finish', () => resolve({ id, path }))
    );
  }
}
