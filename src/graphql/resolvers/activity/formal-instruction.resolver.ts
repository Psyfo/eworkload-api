import FormalInstructionActivityController from '../../../controllers/activity/formal-instruction-activity.controller';
import SupervisionActivityController from '../../../controllers/activity/supervision-activity.controller';

export default {
  Query: {
    // Formal Instruction
    formalInstructionActivity: async (root: any, { activityId }: any) => {
      return await FormalInstructionActivityController.formalInstructionActivity(
        activityId
      );
    },
    formalInstructionActivities: async () => {
      return await FormalInstructionActivityController.formalInstructionActivities();
    },
    formalInstructionActivitiesByUser: async (root: any, { userId }: any) => {
      return await FormalInstructionActivityController.formalInstructionActivitiesByUser(
        userId
      );
    },
    // Supervision
    supervisionActivity: async (root: any, { activityId }: any) => {
      return await SupervisionActivityController.supervisionActivity(
        activityId
      );
    },
    supervisionActivities: async () => {
      return await SupervisionActivityController.supervisionActivities();
    },
    supervisionActivitiesByUser: async (root: any, { userId }: any) => {
      return await SupervisionActivityController.supervisionActivitiesByUser(
        userId
      );
    }
  },
  Mutation: {
    // Formal Instruction
    addFormalInstructionActivity: async (root: any, { activity }: any) => {
      return await FormalInstructionActivityController.createFormalInstructionActivity(
        activity
      );
    },
    editFormalInstructionActivity: async (root: any, { activity }: any) => {
      return await FormalInstructionActivityController.updateFormalInstructionActivity(
        activity
      );
    },
    deleteFormalInstructionActivity: async (root: any, { activity }: any) => {
      return await FormalInstructionActivityController.deleteFormalInstructionActivity(
        activity
      );
    },
    // Supervision
    addSupervisionActivity: async (root: any, { activity }: any) => {
      return await SupervisionActivityController.createSupervisionActivity(
        activity
      );
    },
    editSupervisionActivity: async (root: any, { activity }: any) => {
      return await SupervisionActivityController.updateSupervisionActivity(
        activity
      );
    },
    deleteSupervisionActivity: async (root: any, { activity }: any) => {
      return await SupervisionActivityController.deleteSupervisionActivity(
        activity
      );
    }
  }
};
