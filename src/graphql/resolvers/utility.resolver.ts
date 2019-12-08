import UtilityController from './../../controllers/utility.controller';

export default {
  Query: {},
  Mutation: {
    resetModuleDepartments: async (root: any, { departmentId }: any) => {
      return await UtilityController.resetModuleDepartments(departmentId);
    }
  }
};
