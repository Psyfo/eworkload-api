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
    }
  }
};
