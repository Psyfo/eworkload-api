import * as ModuleMethods from '../../controllers/module.controller';

export default {
  Query: {
    module: async (
      root: any,
      { moduleId, blockId, offeringTypeId, qualificationId }: any
    ) => {
      return await ModuleMethods._module(
        moduleId,
        blockId,
        offeringTypeId,
        qualificationId
      );
    },
    modules: async () => {
      return await ModuleMethods.modules();
    },
    modulesByDiscipline: async (root: any, { disciplineIds }: any) => {
      return await ModuleMethods.modulesByDiscipline(disciplineIds);
    },
    modulesByUnassigned: async () => {
      return await ModuleMethods.modulesByUnassigned();
    },
    modulesByAssigned: async () => {
      return await ModuleMethods.modulesByAssigned();
    },
    modulesByUnassignedAndDiscipline: async (
      root: any,
      { userId, disciplineIds }: any
    ) => {
      return await ModuleMethods.modulesByUnassignedAndDiscipline(
        userId,
        disciplineIds
      );
    },
    modulesByUser: async (root: any, { userId }: any) => {
      return await ModuleMethods.modulesByUser(userId);
    },
    modulesByModerator: async (root: any, { moderatorId }: any) => {
      return await ModuleMethods.modulesByModerator(moderatorId);
    },
    modulesByCoordinator: async (root: any, { coordinatorId }: any) => {
      return await ModuleMethods.modulesByCoordinator(coordinatorId);
    },
    modulesByStack: async (root: any, { stackId }: any) => {
      return await ModuleMethods.modulesByStack(stackId);
    }
  },
  Mutation: {
    addModule: async (root: any, { module }: any) => {
      return await ModuleMethods.addModule(module);
    },
    addModules: async (root: any, { modules }: any) => {
      return await ModuleMethods.addModules(modules);
    },
    editModule: async (root: any, { module }: any) => {
      return await ModuleMethods.editModule(module);
    },
    deleteModule: async (root: any, { module }: any) => {
      return await ModuleMethods.deleteModule(module);
    },
    assignUserToModule: async (
      root: any,
      { moduleId, blockId, offeringTypeId, qualificationId, userId }: any
    ) => {
      return await ModuleMethods.assignUserToModule(
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
      return await ModuleMethods.unassignUserFromModule(
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
      return await ModuleMethods.assignCoordinatorToModule(
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
      return await ModuleMethods.unassignCoordinatorFromModule(
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
      return await ModuleMethods.assignModeratorToModule(
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
      return await ModuleMethods.unassignModeratorFromModule(
        moduleId,
        blockId,
        offeringTypeId,
        qualificationId
      );
    },
    unassignAllModules: async () => {
      return await ModuleMethods.unassignAllModules();
    },
    stackModules: async (root: any, { modules }: any) => {
      return await ModuleMethods.stackModules(modules);
    },
    addModuleToStack: async (root: any, { module, stackId }: any) => {
      return await ModuleMethods.addModuleToStack(module, stackId);
    },
    resetStacks: async () => {
      return await ModuleMethods.resetStacks();
    },
    resetEnrollments: async () => {
      return await ModuleMethods.resetEnrollments();
    }
  }
};
