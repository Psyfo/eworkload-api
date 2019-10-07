import * as UserMethods from '../../../controllers/user';

export default {
  Query: {
    user: (root, args) => {
      return UserMethods.user(args.userId);
    },
    users: () => {
      return UserMethods.users();
    },
    login: (root, args) => {
      return UserMethods.login(args.userId, args.password);
    },
    userExists: (root, args) => {
      return UserMethods.exists(args.userId);
    }
    // profilePicture: () => {}
  },
  Mutation: {
    addUser: (root, args) => {
      return UserMethods.addUser(args.user);
    },
    editUser: (root, args) => {
      return UserMethods.editUser(args.user);
    },
    deleteUser: (root, args) => {
      return UserMethods.deleteUser(args.user);
    },
    changePassword: async (root, args) => {
      return UserMethods.changePassword(
        args.userId,
        args.oldPassword,
        args.newPassword
      );
    },
    assignProfilePicture: (root, { userId, photoUrl }) => {
      return UserMethods.assignProfilePicture(userId, photoUrl);
    }
    // async profilePictureUpload(parent, { file }) {
    //   const { stream, filename, mimetype, encoding } = await file;

    //   // 1. Validate file metadata.

    //   // 2. Stream file contents into cloud storage:
    //   // https://nodejs.org/api/stream.html

    //   // 3. Record the file upload in your DB.
    //   // const id = await recordFile( … )

    //   return { filename, mimetype, encoding };
    // }
  }
};
