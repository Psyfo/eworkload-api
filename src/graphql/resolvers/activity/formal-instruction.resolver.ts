import * as FiMethods from '../../../controllers/activity/formal-instruction.controller';
import * as SMethods from '../../../controllers/activity/supervision.controller';

export default {
  Query: {
    // Formal Instruction
    formalInstructionActivity: async (root: any, { activityId }: any) => {
      return await FiMethods.formalInstructionActivity(activityId);
    },
    formalInstructionActivities: async () => {
      return await FiMethods.formalInstructionActivities();
    },
    formalInstructionActivitiesByUser: async (root: any, { userId }: any) => {
      return await FiMethods.formalInstructionActivitiesByUser(userId);
    },
    // Supervision
    supervisionActivity: async (root: any, { activityId }: any) => {
      return await SMethods.supervisionActivity(activityId);
    },
    supervisionActivities: async () => {
      return await SMethods.supervisionActivities();
    },
    supervisionActivitiesByUser: async (root: any, { userId }: any) => {
      return await SMethods.supervisionActivitiesByUser(userId);
    }
  },
  Mutation: {
    // Formal Instruction
    addFormalInstructionActivity: async (root: any, { activity }: any) => {
      return await FiMethods.addFormalInstructionActivity(activity);
    },
    editFormalInstructionActivity: async (root: any, { activity }: any) => {
      return await FiMethods.editFormalInstructionActivity(activity);
    },
    deleteFormalInstructionActivity: async (root: any, { activity }: any) => {
      return await FiMethods.deleteFormalInstructionActivity(activity);
    },
    // Supervision
    addSupervisionActivity: async (root: any, { activity }: any) => {
      return await SMethods.addSupervisionActivity(activity);
    },
    editSupervisionActivity: async (root: any, { activity }: any) => {
      return await SMethods.editSupervisionActivity(activity);
    },
    deleteSupervisionActivity: async (root: any, { activity }: any) => {
      return await SMethods.deleteSupervisionActivity(activity);
    }
  }
};
