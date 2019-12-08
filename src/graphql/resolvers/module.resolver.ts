import ModuleController from '../../controllers/module.controller';

export default {
  Query: {
    module: async (root: any, { id }: any) => {
      return await ModuleController.module(id);
    },
    modules: async () => {
      return await ModuleController.modules();
    },
    modulesByDiscipline: async (root: any, { disciplineIds }: any) => {
      return await ModuleController.modulesByDiscipline(disciplineIds);
    },
    modulesByStack: async (root: any, { stackId }: any) => {
      return await ModuleController.modulesByStack(stackId);
    },
    stackedWith: async (root: any, { id, stackId }: any) => {
      return await ModuleController.stackedWith(id, stackId);
    },
    unstackedModules: async () => {
      return await ModuleController.unstackedModules();
    },
    modulesByDepartment: async (root: any, { departmentId }: any) => {
      return await ModuleController.modulesByDepartment(departmentId);
    }
  },
  Mutation: {
    addModule: async (root: any, { module }: any) => {
      return await ModuleController.createModule(module);
    },
    addModules: async (root: any, { modules }: any) => {
      return await ModuleController.createModules(modules);
    },
    editModule: async (root: any, { module }: any) => {
      return await ModuleController.updateModule(module);
    },
    deleteModule: async (root: any, { module }: any) => {
      return await ModuleController.deleteModule(module);
    },
    stackModules: async (root: any, { ids }: any) => {
      return await ModuleController.stackModules(ids);
    },
    addModuleToStack: async (root: any, { id, stackId }: any) => {
      return await ModuleController.addModuleToStack(id, stackId);
    },
    unstackModule: async (root: any, { id }: any) => {
      return await ModuleController.unstackModule(id);
    },
    resetStacks: async () => {
      return await ModuleController.resetStacks();
    },
    resetEnrollments: async () => {
      return await ModuleController.resetEnrollments();
    },
    defaultGroupsAllModules: async () => {
      return await ModuleController.defaultGroupsAllModules();
    }
  }
};
