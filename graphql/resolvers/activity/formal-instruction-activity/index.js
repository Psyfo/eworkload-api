import * as FiMethods from './../../../../controllers/activity/formal-instruction';
import * as SMethods from './../../../../controllers/activity/supervision';

export default {
  Query: {
    // Formal Instruction
    formalInstructionActivity: async (root, { activityId }) => {
      return await FiMethods.formalInstructionActivity(activityId);
    },
    formalInstructionActivities: async () => {
      return await FiMethods.formalInstructionActivities();
    },
    formalInstructionActivitiesByUser: async (root, { userId }) => {
      return await FiMethods.formalInstructionActivitiesByUser(userId);
    },
    // Supervision
    supervisionActivity: async (root, { activityId }) => {
      return await SMethods.supervisionActivity(activityId);
    },
    supervisionActivities: async () => {
      return await SMethods.supervisionActivities();
    },
    supervisionActivitiesByUser: async (root, { userId }) => {
      return await SMethods.supervisionActivitiesByUser(userId);
    }
  },
  Mutation: {
    // Formal Instruction
    addFormalInstructionActivity: async (root, { activity }) => {
      return await FiMethods.addFormalInstructionActivity(activity);
    },
    editFormalInstructionActivity: async (root, { activity }) => {
      return await FiMethods.editFormalInstructionActivity(activity);
    },
    deleteFormalInstructionActivity: async (root, { activity }) => {
      return await FiMethods.deleteFormalInstructionActivity(activity);
    },
    // Supervision
    addSupervisionActivity: async (root, { activity }) => {
      return await SMethods.addSupervisionActivity(activity);
    },
    editSupervisionActivity: async (root, { activity }) => {
      return await SMethods.editSupervisionActivity(activity);
    },
    deleteSupervisionActivity: async (root, { activity }) => {
      return await SMethods.deleteSupervisionActivity(activity);
    }
  }
};
