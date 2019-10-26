import * as AAWorkloadMethods from './../../../controllers/workload/academic-administration';
import * as CIWorkloadMethods from './../../../controllers/workload/community-instruction';
import * as EMWorkloadMethods from './../../../controllers/workload/executive-management';
import * as FIWorkloadMethods from './../../../controllers/workload/formal-instruction';
import * as PDWorkloadMethods from './../../../controllers/workload/personnel-development';
import * as PSWorkloadMethods from './../../../controllers/workload/public-service';
import * as RWorkloadMethods from './../../../controllers/workload/research';
import * as SWorkloadMethods from './../../../controllers/workload/supervision';
import * as WorkFocusMethods from './../../../controllers/work-focus';
import * as WorkloadMethods from './../../../controllers/workload';

export default {
  Query: {
    // GENERAL DATA
    teachingHours: async (root, { userId }) => {
      return await WorkFocusMethods.teachingHours(userId);
    },
    researchHours: async (root, { userId }) => {
      return await WorkFocusMethods.researchHours(userId);
    },
    serviceHours: async (root, { userId }) => {
      return await WorkFocusMethods.serviceHours(userId);
    },
    annualHours: async () => {
      return await WorkFocusMethods.annualHours();
    },
    // USER DATA
    totalHoursPerUser: async (root, { userId }) => {
      return await WorkloadMethods.totalHoursPerUser(userId);
    },
    teachingHoursPerUser: async (root, { userId }) => {
      return await WorkloadMethods.teachingHoursPerUser(userId);
    },
    researchHoursPerUser: async (root, { userId }) => {
      return await WorkloadMethods.researchHoursPerUser(userId);
    },
    serviceHoursPerUser: async (root, { userId }) => {
      return await WorkloadMethods.serviceHoursPerUser(userId);
    },
    workloadSummaries: async () => {
      return await WorkloadMethods.workloadSummaries();
    },
    // USER WORKLOADS
    academicAdministrationWorkload: async (root, { userId }) => {
      return await AAWorkloadMethods.academicAdministrationWorkload(userId);
    },
    communityInstructionWorkload: async (root, { userId }) => {
      return await CIWorkloadMethods.communityInstructionWorkload(userId);
    },
    executiveManagementWorkload: async (root, { userId }) => {
      return await EMWorkloadMethods.executiveManagementWorkload(userId);
    },
    formalInstructionWorkload: async (root, { userId }) => {
      return await FIWorkloadMethods.formalInstructionWorkload(userId);
    },
    personnelDevelopmentWorkload: async (root, { userId }) => {
      return await PDWorkloadMethods.personnelDevelopmentWorkload(userId);
    },
    publicServiceWorkload: async (root, { userId }) => {
      return await PSWorkloadMethods.publicServiceWorkload(userId);
    },
    researchWorkload: async (root, { userId }) => {
      return await RWorkloadMethods.researchWorkload(userId);
    },
    supervisionWorkload: async (root, { userId }) => {
      return await SWorkloadMethods.supervisionWorkload(userId);
    },
    initializeWorkloads: async (root, { userId }) => {
      return await WorkloadMethods.initializeWorkloads(userId);
    }
  },

  Mutation: {}
};
