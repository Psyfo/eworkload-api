import * as ModuleMethods from '../../../controllers/module';

export default {
  Query: {
    module: (root, { moduleId, blockId, offeringTypeId, qualificationId }) => {
      return ModuleMethods.module(
        moduleId,
        blockId,
        offeringTypeId,
        qualificationId
      );
    },
    modules: () => {
      return ModuleMethods.modules();
    },
    modulesByDiscipline: (root, { disciplineIds }) => {
      return ModuleMethods.modulesByDiscipline(disciplineIds);
    },
    modulesByUnassigned: () => {
      return ModuleMethods.modulesByUnassigned();
    },
    modulesByAssigned: () => {
      return ModuleMethods.modulesByAssigned();
    },
    modulesByUnassignedAndDiscipline: (root, { disciplineIds }) => {
      return ModuleMethods.modulesByUnassignedAndDiscipline(disciplineIds);
    },
    modulesByUser: (root, { userId }) => {
      return ModuleMethods.modulesByUser(userId);
    },
    modulesByModerator: (root, { moderatorId }) => {
      return ModuleMethods.modulesByModerator(moderatorId);
    },
    modulesByCoordinator: (root, { coordinatorId }) => {
      return ModuleMethods.modulesByCoordinator(coordinatorId);
    },
    modulesByStack: (root, { stackId }) => {
      return ModuleMethods.modulesByStack(stackId);
    }
  },
  Mutation: {
    addModule: (root, { module }) => {
      return ModuleMethods.addModule(module);
    },
    addModules: (root, { modules }) => {
      return ModuleMethods.addModules(modules);
    },
    editModule: (root, { module }) => {
      return ModuleMethods.editModule(module);
    },
    deleteModule: (root, { module }) => {
      return ModuleMethods.deleteModule(module);
    },
    assignUserToModule: (
      root,
      { moduleId, blockId, offeringTypeId, qualificationId, userId }
    ) => {
      return ModuleMethods.assignUserToModule(
        moduleId,
        blockId,
        offeringTypeId,
        qualificationId,
        userId
      );
    },
    unassignUserFromModule: (
      root,
      { moduleId, blockId, offeringTypeId, qualificationId }
    ) => {
      return ModuleMethods.unassignUserFromModule(
        moduleId,
        blockId,
        offeringTypeId,
        qualificationId
      );
    },
    assignCoordinatorToModule: (
      root,
      { moduleId, blockId, offeringTypeId, qualificationId, userId }
    ) => {
      return ModuleMethods.assignCoordinatorToModule(
        moduleId,
        blockId,
        offeringTypeId,
        qualificationId,
        userId
      );
    },
    unassignCoordinatorFromModule: (
      root,
      { moduleId, blockId, offeringTypeId, qualificationId }
    ) => {
      return ModuleMethods.unassignCoordinatorFromModule(
        moduleId,
        blockId,
        offeringTypeId,
        qualificationId
      );
    },
    assignModeratorToModule: (
      root,
      { moduleId, blockId, offeringTypeId, qualificationId, userId }
    ) => {
      return ModuleMethods.assignModeratorToModule(
        moduleId,
        blockId,
        offeringTypeId,
        qualificationId,
        userId
      );
    },
    unassignModeratorFromModule: (
      root,
      { moduleId, blockId, offeringTypeId, qualificationId }
    ) => {
      return ModuleMethods.unassignModeratorFromModule(
        moduleId,
        blockId,
        offeringTypeId,
        qualificationId
      );
    },
    unassignAllModules: () => {
      return ModuleMethods.unassignAllModules();
    }
  }
};
