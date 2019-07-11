import * as ModuleMethods from '../../../controllers/module';

export default {
  Query: {
    module: (root, args) => {
      return ModuleMethods.module(
        args.moduleId,
        args.blockId,
        args.offeringTypeId,
        args.qualificationId
      );
    },
    modules: () => {
      return ModuleMethods.modules();
    },
    modulesByDiscipline: (root, args) => {
      return ModuleMethods.modulesByDiscipline(args.disciplineId);
    },
    modulesByUnassigned: () => {
      return ModuleMethods.modulesByUnassigned();
    },
    modulesByUser: (root, args) => {
      return ModuleMethods.modulesByUser(args.userId);
    },
    modulesByModerator: (root, args) => {
      return ModuleMethods.modulesByModerator(args.moderatorId);
    },
    modulesByCoordinator: (root, args) => {
      return ModuleMethods.modulesByCoordinator(args.coordinator);
    },
    modulesByStack: (root, args) => {
      return ModuleMethods.modulesByStack(args.stackId);
    }
  },
  Mutation: {
    addModule: (root, args) => {
      return ModuleMethods.addModule(args.module);
    },
    addModules: (root, args) => {
      return ModuleMethods.addModules(args.modules);
    },
    editModule: (root, args) => {
      return ModuleMethods.editModule(args.module);
    },
    deleteModule: (root, args) => {
      return ModuleMethods.deleteModule(args.module);
    }
  }
};
