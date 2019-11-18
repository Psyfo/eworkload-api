import ModuleController from '../../controllers/module.controller';

export default {
  Query: {
    module: async (
      root: any,
      { moduleId, blockId, offeringTypeId, qualificationId }: any
    ) => {
      return await ModuleController.module(
        moduleId,
        blockId,
        offeringTypeId,
        qualificationId
      );
    },
    modules: async () => {
      return await ModuleController.modules();
    },
    modulesByDiscipline: async (root: any, { disciplineIds }: any) => {
      return await ModuleController.modulesByDiscipline(disciplineIds);
    },
    modulesByUnassigned: async () => {
      return await ModuleController.modulesByUnassigned();
    },
    modulesByAssigned: async () => {
      return await ModuleController.modulesByAssigned();
    },
    modulesByUnassignedAndDiscipline: async (
      root: any,
      { userId, disciplineIds }: any
    ) => {
      return await ModuleController.modulesByUnassignedAndDiscipline(
        userId,
        disciplineIds
      );
    },
    modulesByUser: async (root: any, { userId }: any) => {
      return await ModuleController.modulesByUser(userId);
    },
    modulesByModerator: async (root: any, { moderatorId }: any) => {
      return await ModuleController.modulesByModerator(moderatorId);
    },
    modulesByCoordinator: async (root: any, { coordinatorId }: any) => {
      return await ModuleController.modulesByCoordinator(coordinatorId);
    },
    modulesByStack: async (root: any, { stackId }: any) => {
      return await ModuleController.modulesByStack(stackId);
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
    assignUserToModule: async (
      root: any,
      { moduleId, blockId, offeringTypeId, qualificationId, userId }: any
    ) => {
      return await ModuleController.assignUserToModule(
        moduleId,
        blockId,
        offeringTypeId,
        qualificationId,
        userId
      );
    },
    unassignUserFromModule: async (
      root: any,
      { moduleId, blockId, offeringTypeId, qualificationId }: any
    ) => {
      return await ModuleController.unassignUserFromModule(
        moduleId,
        blockId,
        offeringTypeId,
        qualificationId
      );
    },
    assignCoordinatorToModule: async (
      root: any,
      { moduleId, blockId, offeringTypeId, qualificationId, userId }: any
    ) => {
      return await ModuleController.assignCoordinatorToModule(
        moduleId,
        blockId,
        offeringTypeId,
        qualificationId,
        userId
      );
    },
    unassignCoordinatorFromModule: async (
      root: any,
      { moduleId, blockId, offeringTypeId, qualificationId }: any
    ) => {
      return await ModuleController.unassignCoordinatorFromModule(
        moduleId,
        blockId,
        offeringTypeId,
        qualificationId
      );
    },
    assignModeratorToModule: async (
      root: any,
      { moduleId, blockId, offeringTypeId, qualificationId, userId }: any
    ) => {
      return await ModuleController.assignModeratorToModule(
        moduleId,
        blockId,
        offeringTypeId,
        qualificationId,
        userId
      );
    },
    unassignModeratorFromModule: async (
      root: any,
      { moduleId, blockId, offeringTypeId, qualificationId }: any
    ) => {
      return await ModuleController.unassignModeratorFromModule(
        moduleId,
        blockId,
        offeringTypeId,
        qualificationId
      );
    },
    unassignAllModules: async () => {
      return await ModuleController.unassignAllModules();
    },
    stackModules: async (root: any, { modules }: any) => {
      return await ModuleController.stackModules(modules);
    },
    addModuleToStack: async (root: any, { module, stackId }: any) => {
      return await ModuleController.addModuleToStack(module, stackId);
    },
    resetStacks: async () => {
      return await ModuleController.resetStacks();
    },
    resetEnrollments: async () => {
      return await ModuleController.resetEnrollments();
    }
  }
};
