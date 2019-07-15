import * as FiMethods from './../../../../controllers/activity/formal-instruction';
import * as SMethods from './../../../../controllers/activity/supervision';

export default {
  Query: {
    // Formal Instruction
    formalInstructionActivity: (root, args) => {
      return FiMethods.formalInstructionActivity(args.activityId);
    },
    formalInstructionActivities: () => {
      return FiMethods.formalInstructionActivities();
    },
    formalInstructionActivitiesByUser: (root, args) => {
      return FiMethods.formalInstructionActivitiesByUser(args.userId);
    },
    // Supervision
    supervisionActivity: (root, args) => {
      return SMethods.supervisionActivity(args.activityId);
    },
    supervisionActivities: () => {
      return SMethods.supervisionActivities();
    },
    supervisionActivitiesByUser: (root, args) => {
      return SMethods.supervisionActivitiesByUser(args.userId);
    }
  },
  Mutation: {
    // Formal Instruction
    addFormalInstructionActivity: async (root, args) => {
      return FiMethods.addFormalInstructionActivity(
        args.formalInstructionActivity
      );
    },
    editFormalInstructionActivity: (root, args) => {
      return FiMethods.editFormalInstructionActivity(
        args.formalInstructionActivity
      );
    },
    deleteFormalInstructionActivity: (root, args) => {
      return FiMethods.deleteFormalInstructionActivity(
        args.formalInstructionActivity
      );
    },
    // Supervision
    addSupervisionActivity: (root, args) => {
      return SMethods.addSupervisionActivity(args.supervisionActivity);
    },
    editSupervisionActivity: (root, args) => {
      return SMethods.editSupervisionActivity(args.supervisionActivity);
    },
    deleteSupervisionActivity: (root, args) => {
      return SMethods.deleteSupervisionActivity(args.supervisionActivity);
    }
  }
};
