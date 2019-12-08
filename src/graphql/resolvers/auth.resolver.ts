import AuthController from './../../auth/auth.controller';

export default {
  Query: {
    login: async (root: any, { userId, password }: any) => {
      return await AuthController.login(userId, password);
    }
  },
  Mutation: {
    changePassword: async (root: any, { userId, password, newPassword }: any) => {
      return await AuthController.changePassword(userId, password, newPassword);
    }
  }
};
