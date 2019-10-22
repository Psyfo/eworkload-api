import * as FileMethods from '../../../controllers/upload';

export default {
  Query: {
    files: () => {
      return FileMethods.files();
    }
  },
  Mutation: {
    singleUpload: async (root, { file }) => {
      console.log('singleUpload resolver firing:', await file);

      return await FileMethods.processUpload(file);
    },
    uploadProfilePicture: async (root, { file, userId }) => {
      console.log('uploadProfilePic resolver firing');
      console.log('file: ', await file);
      console.log('User ID: ', userId);

      return await FileMethods.uploadProfilePictureAWS(file, userId);
    },
    uploadEvidence: async (root, { file, userId, activityId }) => {
      console.log('uploadEvidence resolver firing');
      console.log('file: ', await file);
      console.log('activityId: ', activityId);

      return await FileMethods.uploadEvidenceAWS(file, userId, activityId);
    },
    uploadAcademicAdministrationEvidenceAWS: async (
      root,
      { file, userId, activityId }
    ) => {
      console.log('uploadAAEvidence resolver firing');
      console.log('file: ', await file);
      console.log('activityId: ', activityId);

      return await FileMethods.uploadAcademicAdministrationEvidenceAWS(
        file,
        userId,
        activityId
      );
    },
    uploadResearchEvidenceAWS: async (root, { file, userId, activityId }) => {
      console.log('uploadAAEvidence resolver firing');
      console.log('file: ', await file);
      console.log('activityId: ', activityId);

      return await FileMethods.uploadResearchEvidenceAWS(
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
