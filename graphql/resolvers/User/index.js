import * as UserMethods from './../../../controllers/user';

export default {
  Query: {
    user: async (root, args) => {
      return await UserMethods.user(args.userId);
    },
    users: async () => {
      return await UserMethods.users();
    },
    usersByPosition: async () => {
      return await UserMethods.usersByPosition();
    },
    login: async (root, args) => {
      return await UserMethods.login(args.userId, args.password);
    },
    userExists: async (root, args) => {
      return await UserMethods.exists(args.userId);
    }
    // profilePicture: () => {}
  },
  Mutation: {
    addUser: async (root, args) => {
      return await UserMethods.addUser(args.user);
    },
    editUser: async (root, args) => {
      return await UserMethods.editUser(args.user);
    },
    deleteUser: async (root, args) => {
      return await UserMethods.deleteUser(args.user);
    },
    changePassword: async (root, args) => {
      return await UserMethods.changePassword(
        args.userId,
        args.oldPassword,
        args.newPassword
      );
    },
    assignProfilePicture: async (root, { userId, photoUrl }) => {
      return await UserMethods.assignProfilePicture(userId, photoUrl);
    }
  }
};
