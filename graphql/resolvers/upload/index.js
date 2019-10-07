import * as FileMethods from '../../../controllers/upload';

export default {
  Query: {
    files: () => {
      return FileMethods.files();
    }
  },
  Mutation: {
    singleUpload: async (root, { file }) => {
      console.log('singleUpload resolver firing:', file);

      return await FileMethods.processUpload(file);
    },
    uploadProfilePicture: async (root, { file, userId }) => {
      console.log('uploadProfilePic resolver firing:', file);
      console.log('User ID: ', userId);

      return await FileMethods.uploadProfilePicture(file, userId);
    },
    uploadEvidence: async (root, { file, activityId }) => {
      console.log('uploadEvidence resolver firing:', file);

      return await FileMethods.uploadEvidence(file, activityId);
    },
    uploadAcademicAdministrationEvidence: async (
      root,
      { file, activityId }
    ) => {
      console.log(
        'uploadAcademicAdministrationEvidence resolver firing:',
        file
      );

      return await FileMethods.uploadAcademicAdministrationEvidence(
        file,
        activityId
      );
    },
    uploadResearchEvidence: async (root, { file, activityId }) => {
      console.log('uploadResearchEvidence resolver firing:', file);

      return await FileMethods.uploadResearchEvidence(file, activityId);
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
