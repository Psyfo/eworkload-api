import * as WorkloadMethods from '../../../controllers/workload';

export default {
  Query: {
    academicAdministrationWorkloadPerUser: async (root, args) => {
      return await WorkloadMethods.academicAdministrationWorkloadDataPerUser(
        args.userId
      );
    },
    communityInstructionWorkloadPerUser: async (root, args) => {
      return await WorkloadMethods.communityInstructionWorkloadDataPerUser(
        args.userId
      );
    },
    executiveManagementWorkloadPerUser: async (root, args) => {
      return await WorkloadMethods.executiveManagementWorkloadDataPerUser(
        args.userId
      );
    },
    formalInstructionWorkloadPerUser: async (root, args) => {
      return await WorkloadMethods.formalInstructionWorkloadDataPerUser(
        args.userId
      );
    },
    personnelDevelopmentWorkloadPerUser: async (root, args) => {
      return await WorkloadMethods.personnelDevelopmentWorkloadDataPerUser(
        args.userId
      );
    },
    publicServiceWorkloadPerUser: async (root, args) => {
      return await WorkloadMethods.publicServiceWorkloadDataPerUser(
        args.userId
      );
    },
    supervisionWorkloadPerUser: async (root, args) => {
      return await WorkloadMethods.supervisionWorkloadDataPerUser(args.userId);
    }
  },
  Mutation: {}
};
