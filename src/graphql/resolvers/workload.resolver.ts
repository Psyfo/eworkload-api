import AcademicAdministrationWorkloadController from '../../controllers/workload/academic-administration-workload.controller';
import CommunityInstructionWorkloadController from '../../controllers/workload/community-instruction-workload.controller';
import ExecutiveManagementWorkloadController from '../../controllers/workload/executive-management-workload.controller';
import FormalInstructionWorkloadController from '../../controllers/workload/formal-instruction-workload.controller';
import PersonnelDevelopmentWorkloadController from '../../controllers/workload/personnel-development-workload.controller';
import PublicServiceWorkloadController from '../../controllers/workload/public-service-workload.controller';
import ResearchWorkloadController from '../../controllers/workload/research-workload.controller';
import SupervisionWorkloadController from '../../controllers/workload/supervision-workload.controller';
import WorkFocusController from '../../controllers/work-focus.controller';
import WorkloadController from '../../controllers/workload/workload.controller';

export default {
  Query: {
    // GENERAL DATA
    teachingHours: async (root: any, { userId }: any) => {
      return await WorkFocusController.teachingHours(userId);
    },
    researchHours: async (root: any, { userId }: any) => {
      return await WorkFocusController.researchHours(userId);
    },
    serviceHours: async (root: any, { userId }: any) => {
      return await WorkFocusController.serviceHours(userId);
    },
    annualHours: async () => {
      return await WorkFocusController.annualHours();
    },
    // USER DATA
    totalHoursPerUser: async (root: any, { userId }: any) => {
      return await WorkloadController.totalHoursPerUser(userId);
    },
    teachingHoursPerUser: async (root: any, { userId }: any) => {
      return await WorkloadController.teachingHoursPerUser(userId);
    },
    researchHoursPerUser: async (root: any, { userId }: any) => {
      return await WorkloadController.researchHoursPerUser(userId);
    },
    serviceHoursPerUser: async (root: any, { userId }: any) => {
      return await WorkloadController.serviceHoursPerUser(userId);
    },
    workloadSummaries: async () => {
      return await WorkloadController.workloadSummaries();
    },
    // USER WORKLOADS
    academicAdministrationWorkload: async (root: any, { userId }: any) => {
      return await AcademicAdministrationWorkloadController.academicAdministrationWorkload(
        userId
      );
    },
    communityInstructionWorkload: async (root: any, { userId }: any) => {
      return await CommunityInstructionWorkloadController.communityInstructionWorkload(
        userId
      );
    },
    executiveManagementWorkload: async (root: any, { userId }: any) => {
      return await ExecutiveManagementWorkloadController.executiveManagementWorkload(
        userId
      );
    },
    formalInstructionWorkload: async (root: any, { userId }: any) => {
      return await FormalInstructionWorkloadController.formalInstructionWorkload(
        userId
      );
    },
    personnelDevelopmentWorkload: async (root: any, { userId }: any) => {
      return await PersonnelDevelopmentWorkloadController.personnelDevelopmentWorkload(
        userId
      );
    },
    publicServiceWorkload: async (root: any, { userId }: any) => {
      return await PublicServiceWorkloadController.publicServiceWorkload(
        userId
      );
    },
    researchWorkload: async (root: any, { userId }: any) => {
      return await ResearchWorkloadController.researchWorkload(userId);
    },
    supervisionWorkload: async (root: any, { userId }: any) => {
      return await SupervisionWorkloadController.supervisionWorkload(userId);
    },
    totalWorkload: async (root: any, { userId }: any) => {
      return await WorkloadController.totalWorkload(userId);
    }
  },
  Mutation: {
    initializeWorkloads: async (root: any, { userId }: any) => {
      return await WorkloadController.initializeWorkloads(userId);
    },
    updateWorkloads: async (root: any, { userId }: any) => {
      return await WorkloadController.calculateTotalWorkload(userId);
    },
    deleteWorkloads: async (root: any, { userId }: any) => {
      return await WorkloadController.deleteWorkloads(userId);
    }
  }
};
