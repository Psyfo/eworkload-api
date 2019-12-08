import UserController from '../../controllers/user.controller';

export default {
  Query: {
    user: async (root: any, { userId }: any) => {
      return await UserController.user(userId);
    },
    users: async () => {
      return await UserController.users();
    },
    usersByPosition: async (root: any, { positionId }: any) => {
      return await UserController.usersByPosition();
    },
    userExists: async (root: any, { userId }: any) => {
      return await UserController.exists(userId);
    }
  },
  Mutation: {
    addUser: async (root: any, { user }: any) => {
      return await UserController.createUser(user);
    },
    editUser: async (root: any, { user }: any) => {
      return await UserController.updateUser(user);
    },
    deleteUser: async (root: any, { user }: any) => {
      return await UserController.deleteUser(user);
    },
    assignProfilePicture: async (root: any, { userId, photoUrl }: any) => {
      return await UserController.assignProfilePicture(userId, photoUrl);
    }
  }
};
