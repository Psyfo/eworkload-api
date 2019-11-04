import * as ModuleMethods from '../../../controllers/module';

export default {
  Query: {
    module: async (
      root,
      { moduleId, blockId, offeringTypeId, qualificationId }
    ) => {
      return await ModuleMethods.module(
        moduleId,
        blockId,
        offeringTypeId,
        qualificationId
      );
    },
    modules: async () => {
      return await ModuleMethods.modules();
    },
    modulesByDiscipline: async (root, { disciplineIds }) => {
      return await ModuleMethods.modulesByDiscipline(disciplineIds);
    },
    modulesByUnassigned: async () => {
      return await ModuleMethods.modulesByUnassigned();
    },
    modulesByAssigned: async () => {
      return await ModuleMethods.modulesByAssigned();
    },
    modulesByUnassignedAndDiscipline: async (root, { disciplineIds }) => {
      return await ModuleMethods.modulesByUnassignedAndDiscipline(
        disciplineIds
      );
    },
    modulesByUser: async (root, { userId }) => {
      return await ModuleMethods.modulesByUser(userId);
    },
    modulesByModerator: async (root, { moderatorId }) => {
      return await ModuleMethods.modulesByModerator(moderatorId);
    },
    modulesByCoordinator: async (root, { coordinatorId }) => {
      return await ModuleMethods.modulesByCoordinator(coordinatorId);
    },
    modulesByStack: async (root, { stackId }) => {
      return await ModuleMethods.modulesByStack(stackId);
    }
  },
  Mutation: {
    addModule: async (root, { module }) => {
      return await ModuleMethods.addModule(module);
    },
    addModules: async (root, { modules }) => {
      return await ModuleMethods.addModules(modules);
    },
    editModule: async (root, { module }) => {
      return await ModuleMethods.editModule(module);
    },
    deleteModule: async (root, { module }) => {
      return await ModuleMethods.deleteModule(module);
    },
    assignUserToModule: async (
      root,
      { moduleId, blockId, offeringTypeId, qualificationId, userId }
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
      root,
      { moduleId, blockId, offeringTypeId, qualificationId }
    ) => {
      return await ModuleMethods.unassignUserFromModule(
        moduleId,
        blockId,
        offeringTypeId,
        qualificationId
      );
    },
    assignCoordinatorToModule: async (
      root,
      { moduleId, blockId, offeringTypeId, qualificationId, userId }
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
      root,
      { moduleId, blockId, offeringTypeId, qualificationId }
    ) => {
      return await ModuleMethods.unassignCoordinatorFromModule(
        moduleId,
        blockId,
        offeringTypeId,
        qualificationId
      );
    },
    assignModeratorToModule: async (
      root,
      { moduleId, blockId, offeringTypeId, qualificationId, userId }
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
      root,
      { moduleId, blockId, offeringTypeId, qualificationId }
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
    stackModules: async (root, { modules }) => {
      return await ModuleMethods.stackModules(modules);
    }
  }
};
