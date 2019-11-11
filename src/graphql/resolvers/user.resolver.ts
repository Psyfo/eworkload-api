import * as UserMethods from '../../controllers/user.controller';

export default {
  Query: {
    user: async (root: any, { userId }: any) => {
      return await UserMethods.user(userId);
    },
    users: async () => {
      return await UserMethods.users();
    },
    usersByPosition: async (root: any, { positionId }: any) => {
      return await UserMethods.usersByPosition();
    },
    login: async (root: any, { userId, password }: any) => {
      return await UserMethods.login(userId, password);
    },
    userExists: async (root: any, { userId }: any) => {
      return await UserMethods.exists(userId);
    }
  },
  Mutation: {
    addUser: async (root: any, { user }: any) => {
      return await UserMethods.addUser(user);
    },
    editUser: async (root: any, { user }: any) => {
      return await UserMethods.editUser(user);
    },
    deleteUser: async (root: any, { user }: any) => {
      return await UserMethods.deleteUser(user);
    },
    changePassword: async (
      root: any,
      { userId, oldPassword, newPassword }: any
    ) => {
      return await UserMethods.changePassword(userId, oldPassword, newPassword);
    },
    assignProfilePicture: async (root: any, { userId, photoUrl }: any) => {
      return await UserMethods.assignProfilePicture(userId, photoUrl);
    }
  }
};
