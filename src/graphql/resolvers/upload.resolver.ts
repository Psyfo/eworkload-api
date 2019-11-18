import UploadController from '../../controllers/upload.controller';
import { logger } from './../../config/logger';

export default {
  Query: {
    files: () => {
      return UploadController.files();
    }
  },
  Mutation: {
    singleUpload: async () => {},
    uploadProfilePicture: async (root: any, { file, userId }: any) => {
      logger.info('uploadProfilePic resolver firing');
      logger.info('file: ', await file);
      logger.info('User ID: ', userId);

      return await UploadController.uploadProfilePictureAWS(file, userId);
    },
    uploadAcademicAdministrationEvidenceAWS: async (
      root: any,
      { file, userId, activityId }: any
    ) => {
      logger.info('uploadAAEvidence resolver firing');
      logger.info('file: ', await file);
      logger.info('activityId: ', activityId);

      return await UploadController.uploadAcademicAdministrationEvidenceAWS(
        file,
        userId,
        activityId
      );
    },
    uploadResearchEvidenceAWS: async (
      root: any,
      { file, userId, activityId }: any
    ) => {
      logger.info('uploadAAEvidence resolver firing');
      logger.info('file: ', await file);
      logger.info('activityId: ', activityId);

      return await UploadController.uploadResearchEvidenceAWS(
        file,
        userId,
        activityId
      );
    }

    // async multipleUpload(
    //   obj,
    //   { files },
    //   {
    //     utils: { processUpload }
    //   }
    // ) {
    //   const { resolve, reject } = await promisesAll.all(
    //     files.map(processUpload)
    //   );

    //   if (reject.length)
    //     reject.forEach(({ name, message }) =>
    //       console.error(`${name}: ${message}`)
    //     );

    //   return resolve;
    // }
  }
};
