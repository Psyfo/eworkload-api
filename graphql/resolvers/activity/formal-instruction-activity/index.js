import * as FiMethods from './../../../../controllers/activity/formal-instruction';
import * as SMethods from './../../../../controllers/activity/supervision';

export default {
  Query: {
    // Formal Instruction
    formalInstructionActivity: (root, { activityId }) => {
      return FiMethods.formalInstructionActivity(activityId);
    },
    formalInstructionActivities: () => {
      return FiMethods.formalInstructionActivities();
    },
    formalInstructionActivitiesByUser: (root, { userId }) => {
      return FiMethods.formalInstructionActivitiesByUser(userId);
    },
    // Supervision
    supervisionActivity: (root, { activityId }) => {
      return SMethods.supervisionActivity(activityId);
    },
    supervisionActivities: () => {
      return SMethods.supervisionActivities();
    },
    supervisionActivitiesByUser: (root, { userId }) => {
      return SMethods.supervisionActivitiesByUser(userId);
    }
  },
  Mutation: {
    // Formal Instruction
    addFormalInstructionActivity: async (root, { activity }) => {
      return FiMethods.addFormalInstructionActivity(activity);
    },
    editFormalInstructionActivity: (root, { activity }) => {
      return FiMethods.editFormalInstructionActivity(activity);
    },
    deleteFormalInstructionActivity: (root, { activity }) => {
      return FiMethods.deleteFormalInstructionActivity(activity);
    },
    // Supervision
    addSupervisionActivity: (root, { activity }) => {
      return SMethods.addSupervisionActivity(activity);
    },
    editSupervisionActivity: (root, { activity }) => {
      return SMethods.editSupervisionActivity(activity);
    },
    deleteSupervisionActivity: (root, { activity }) => {
      return SMethods.deleteSupervisionActivity(activity);
    }
  }
};
