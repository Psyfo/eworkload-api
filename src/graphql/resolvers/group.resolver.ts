import GroupController from '../../controllers/group.controller';
import { any } from 'joi';

export default {
  Query: {
    group: async (root: any, { id }: any) => {
      return await GroupController.group(id);
    },
    groups: async () => {
      return await GroupController.groups();
    },
    groupsByModule: async (root: any, { moduleId }: any) => {
      return await GroupController.groupsByModule(moduleId);
    },
    groupTotal: async (root: any, { moduleId }: any) => {
      return await GroupController.groupTotal(moduleId);
    },
    remainingStudents: async (root: any, { moduleId }: any) => {
      return await GroupController.remainingStudents(moduleId);
    },
    groupExists: async (root: any, { groupId, moduleId }: any) => {
      return await GroupController.groupExists(groupId, moduleId);
    }
  },
  Mutation: {
    createGroup: async (root: any, { group }: any) => {
      return await GroupController.createGroup(group);
    },
    updateGroup: async (root: any, { group }: any) => {
      return await GroupController.updateGroup(group);
    },
    deleteGroup: async (root: any, { group }: any) => {
      return await GroupController.deleteGroup(group);
    }
  }
};
