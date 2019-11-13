import * as AAWorkloadMethods from "../../controllers/workload/academic-administration-workload.controller";
import * as CIWorkloadMethods from "../../controllers/workload/community-instruction-workload.controller";
import * as EMWorkloadMethods from "../../controllers/workload/executive-management-workload.controller";
import * as FIWorkloadMethods from "../../controllers/workload/formal-instruction-workload.controller";
import * as PDWorkloadMethods from "../../controllers/workload/personnel-development-workload.controller";
import * as PSWorkloadMethods from "../../controllers/workload/public-service-workload.controller";
import * as RWorkloadMethods from "../../controllers/workload/research-workload.controller";
import * as SWorkloadMethods from "../../controllers/workload/supervision-workload.controller";
import * as WorkFocusMethods from "../../controllers/work-focus.controller";
import * as WorkloadMethods from "../../controllers/workload.controller";

export default {
  Query: {
    // GENERAL DATA
    teachingHours: async (root: any, { userId }: any) => {
      return await WorkFocusMethods.teachingHours(userId);
    },
    researchHours: async (root: any, { userId }: any) => {
      return await WorkFocusMethods.researchHours(userId);
    },
    serviceHours: async (root: any, { userId }: any) => {
      return await WorkFocusMethods.serviceHours(userId);
    },
    annualHours: async () => {
      return await WorkFocusMethods.annualHours();
    },
    // USER DATA
    totalHoursPerUser: async (root: any, { userId }: any) => {
      return await WorkloadMethods.totalHoursPerUser(userId);
    },
    teachingHoursPerUser: async (root: any, { userId }: any) => {
      return await WorkloadMethods.teachingHoursPerUser(userId);
    },
    researchHoursPerUser: async (root: any, { userId }: any) => {
      return await WorkloadMethods.researchHoursPerUser(userId);
    },
    serviceHoursPerUser: async (root: any, { userId }: any) => {
      return await WorkloadMethods.serviceHoursPerUser(userId);
    },
    workloadSummaries: async () => {
      return await WorkloadMethods.workloadSummaries();
    },
    // USER WORKLOADS
    academicAdministrationWorkload: async (root: any, { userId }: any) => {
      return await AAWorkloadMethods.academicAdministrationWorkload(userId);
    },
    communityInstructionWorkload: async (root: any, { userId }: any) => {
      return await CIWorkloadMethods.communityInstructionWorkload(userId);
    },
    executiveManagementWorkload: async (root: any, { userId }: any) => {
      return await EMWorkloadMethods.executiveManagementWorkload(userId);
    },
    formalInstructionWorkload: async (root: any, { userId }: any) => {
      return await FIWorkloadMethods.formalInstructionWorkload(userId);
    },
    personnelDevelopmentWorkload: async (root: any, { userId }: any) => {
      return await PDWorkloadMethods.personnelDevelopmentWorkload(userId);
    },
    publicServiceWorkload: async (root: any, { userId }: any) => {
      return await PSWorkloadMethods.publicServiceWorkload(userId);
    },
    researchWorkload: async (root: any, { userId }: any) => {
      return await RWorkloadMethods.researchWorkload(userId);
    },
    supervisionWorkload: async (root: any, { userId }: any) => {
      return await SWorkloadMethods.supervisionWorkload(userId);
    },
    totalWorkload: async (root: any, { userId }: any) => {
      return await WorkloadMethods.totalWorkload(userId);
    }
  },
  Mutation: {
    initializeWorkloads: async (root: any, { userId }: any) => {
      await WorkloadMethods.initializeWorkloads(userId);
      return "Workload initialized";
    },
    updateWorkloads: async (root: any, { userId }: any) => {
      await WorkloadMethods.calculateTotalWorkload(userId);
      return `Workloads updated for User: ${userId}`;
    },
    deleteWorkloads: async (root: any, { userId }: any) => {
      await WorkloadMethods.deleteWorkloads(userId);
      return `Workloads deleted for User: ${userId}`;
    }
  }
};
