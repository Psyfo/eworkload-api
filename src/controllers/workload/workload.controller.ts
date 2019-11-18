import IUser from 'interfaces/user.interface';
import IAcademicAdministrationWorkload from 'interfaces/workload/academic-administration-workload.interface';
import ICommunityInstructionWorkload from 'interfaces/workload/community-instruction-workload.interface';
import IExecutiveManagementWorkload from 'interfaces/workload/executive-management-workload.interface';
import IFormalInstructionWorkload from 'interfaces/workload/formal-instruction-workload.interface';
import IPersonnelDevelopmentWorkload from 'interfaces/workload/personnel-development-workload.interface';
import IPublicServiceWorkload from 'interfaces/workload/public-service-workload.interface';
import IResearchWorkload from 'interfaces/workload/research-workload.interface';
import ISupervisionWorkload from 'interfaces/workload/supervision-workload.interface';

import { logger } from '../../config/logger';
import AcademicAdministrationActivityController from '../activity/academic-administration-activity.controller';
import CommunityInstructionActivityController from '../activity/community-instruction-activity.controller';
import ExecutiveManagementActivityController from '../activity/executive-management-activity.controller';
import FormalInstructionActivityController from '../activity/formal-instruction-activity.controller';
import PersonnelDevelopmentActivityController from '../activity/personnel-development-activity.controller';
import PublicServiceActivityController from '../activity/public-service-activity.controller';
import ResearchActivityController from '../activity/research-activity.controller';
import SupervisionActivityController from '../activity/supervision-activity.controller';
import UserController from '../user.controller';
import WorkFocusController from '../work-focus.controller';
import AcademicAdministrationWorkloadController from './academic-administration-workload.controller';
import CommunityInstructionWorkloadController from './community-instruction-workload.controller';
import ExecutiveManagementWorkloadController from './executive-management-workload.controller';
import FormalInstructionWorkloadController from './formal-instruction-workload.controller';
import PersonnelDevelopmentWorkloadController from './personnel-development-workload.controller';
import PublicServiceWorkloadController from './public-service-workload.controller';
import ResearchWorkloadController from './research-workload.controller';
import SupervisionWorkloadController from './supervision-workload.controller';

export default class WorkloadController {
  public static async totalHoursPerUser(userId: any) {
    const aaHours: number = await AcademicAdministrationActivityController.academicAdministrationTotalHoursPerUser(
      userId
    );
    const ciHours: number = await CommunityInstructionActivityController.communityInstructionTotalHoursPerUser(
      userId
    );
    const emHours: number = await ExecutiveManagementActivityController.executiveManagementTotalHoursPerUser(
      userId
    );
    const fiHours: number = await FormalInstructionActivityController.formalInstructionTotalHoursPerUser(
      userId
    );
    const pdHours: number = await PersonnelDevelopmentActivityController.personnelDevelopmentTotalHoursPerUser(
      userId
    );
    const psHours: number = await PublicServiceActivityController.publicServiceTotalHoursPerUser(
      userId
    );
    const rHours: number = await ResearchActivityController.researchTotalHoursPerUser(
      userId
    );
    const sHours: number = await SupervisionActivityController.supervisionTotalHoursPerUser(
      userId
    );
    let total: number = 0;
    try {
      total =
        aaHours +
        ciHours +
        emHours +
        fiHours +
        pdHours +
        psHours +
        rHours +
        sHours;
    } catch (error) {
      logger.error(error);
    }
    return total;
  }
  public static async teachingHoursPerUser(userId: string) {
    const fiHours: number = await FormalInstructionActivityController.formalInstructionTotalHoursPerUser(
      userId
    );
    const sHours: number = await SupervisionActivityController.supervisionTotalHoursPerUser(
      userId
    );
    const total: number = fiHours + sHours;
    return total;
  }
  public static async researchHoursPerUser(userId: string) {
    const rHours: number = await ResearchActivityController.researchTotalHoursPerUser(
      userId
    );
    const total: number = rHours;
    return total;
  }
  public static async serviceHoursPerUser(userId: string) {
    const aaHours: number = await AcademicAdministrationActivityController.academicAdministrationTotalHoursPerUser(
      userId
    );
    const ciHours: number = await CommunityInstructionActivityController.communityInstructionTotalHoursPerUser(
      userId
    );
    const emHours: number = await ExecutiveManagementActivityController.executiveManagementTotalHoursPerUser(
      userId
    );
    const pdHours: number = await PersonnelDevelopmentActivityController.personnelDevelopmentTotalHoursPerUser(
      userId
    );
    const psHours: number = await PublicServiceActivityController.publicServiceTotalHoursPerUser(
      userId
    );
    const total: number = aaHours + ciHours + emHours + pdHours + psHours;
    return total;
  }
  public static async initializeWorkloads(userId: string) {
    await this.deleteWorkloads(userId);
    await AcademicAdministrationWorkloadController.initializeAAWorkload(userId);
    await CommunityInstructionWorkloadController.initializeCIWorkload(userId);
    await ExecutiveManagementWorkloadController.initializeEMWorkload(userId);
    await FormalInstructionWorkloadController.initializeFIWorkload(userId);
    await PersonnelDevelopmentWorkloadController.initializePDWorkload(userId);
    await PublicServiceWorkloadController.initializePSWorkload(userId);
    await ResearchWorkloadController.initializeRWorkload(userId);
    await SupervisionWorkloadController.initializeSWorkload(userId);
    logger.info(`Workloads initialized for User: ${userId}`);
    return `Workloads initialized for User: ${userId}`;
  }
  public static async deleteWorkloads(userId: string) {
    await AcademicAdministrationWorkloadController.deleteAcademicAdministrationWorkload(
      userId
    );
    await CommunityInstructionWorkloadController.deleteCommunityInstructionWorkload(
      userId
    );
    await ExecutiveManagementWorkloadController.deleteExecutiveManagementWorkload(
      userId
    );
    await FormalInstructionWorkloadController.deleteFormalInstructionWorkload(
      userId
    );
    await PersonnelDevelopmentWorkloadController.deletePersonnelDevelopmentWorkload(
      userId
    );
    await PublicServiceWorkloadController.deletePublicServiceWorkload(userId);
    await ResearchWorkloadController.deleteResearchWorkload(userId);
    await SupervisionWorkloadController.deleteSupervisionWorkload(userId);
    logger.info(`Workloads deleted for User: ${userId}`);
    return `Workloads deleted for User: ${userId}`;
  }
  public static async calculateTotalWorkload(userId: string) {
    // Delete current workloads for user
    await this.deleteWorkloads(userId);

    // Calculate and save workloads
    await AcademicAdministrationWorkloadController.calculateAcademicAdministrationWorkload(
      userId
    );
    await CommunityInstructionWorkloadController.calculateCommunityInstructionWorkload(
      userId
    );
    await ExecutiveManagementWorkloadController.calculateExecutiveManagementWorkload(
      userId
    );
    await FormalInstructionWorkloadController.calculateFormalInstructionWorkload(
      userId
    );
    await PersonnelDevelopmentWorkloadController.calculatePersonnelDevelopmentWorkload(
      userId
    );
    await PublicServiceWorkloadController.calculatePublicServiceWorkload(
      userId
    );
    await ResearchWorkloadController.calculateResearchWorkload(userId);
    await SupervisionWorkloadController.calculateSupervisionWorkload(userId);
    logger.info('Workloads calculated!');

    // Return totalWorkload only afterwards;
    return await this.totalWorkload(userId);
  }
  public static async totalWorkload(userId: string) {
    const aaWorkload: IAcademicAdministrationWorkload = (await AcademicAdministrationWorkloadController.academicAdministrationWorkload(
      userId
    )) as IAcademicAdministrationWorkload;
    const ciWorkload: ICommunityInstructionWorkload = (await CommunityInstructionWorkloadController.communityInstructionWorkload(
      userId
    )) as ICommunityInstructionWorkload;
    const emWorkload: IExecutiveManagementWorkload = (await ExecutiveManagementWorkloadController.executiveManagementWorkload(
      userId
    )) as IExecutiveManagementWorkload;
    const fiWorkload: IFormalInstructionWorkload = (await FormalInstructionWorkloadController.formalInstructionWorkload(
      userId
    )) as IFormalInstructionWorkload;
    const pdWorkload: IPersonnelDevelopmentWorkload = (await PersonnelDevelopmentWorkloadController.personnelDevelopmentWorkload(
      userId
    )) as IPersonnelDevelopmentWorkload;
    const psWorkload: IPublicServiceWorkload = (await PublicServiceWorkloadController.publicServiceWorkload(
      userId
    )) as IPublicServiceWorkload;
    const rWorkload: IResearchWorkload = (await ResearchWorkloadController.researchWorkload(
      userId
    )) as IResearchWorkload;
    const sWorkload: ISupervisionWorkload = (await SupervisionWorkloadController.supervisionWorkload(
      userId
    )) as ISupervisionWorkload;

    return {
      academicAdministrationWorkload: aaWorkload,
      communityInstructionWorkload: ciWorkload,
      executiveManagementWorkload: emWorkload,
      formalInstructionWorkload: fiWorkload,
      personnelDevelopmentWorkload: pdWorkload,
      publicServiceWorkload: psWorkload,
      researchWorkload: rWorkload,
      supervisionWorkload: sWorkload
    };
  }
  public static async workloadSummaries() {
    let workloadSummary = [];
    const users: IUser[] = (await UserController.users()) as IUser[];
    for (let user of users) {
      const tHours = await WorkFocusController.teachingHours(user.userId);
      const rHours = await WorkFocusController.researchHours(user.userId);
      const sHours = await WorkFocusController.serviceHours(user.userId);
      const tHoursPerUser = await this.teachingHoursPerUser(user.userId);
      const rHoursPerUser = await this.researchHoursPerUser(user.userId);
      const sHoursPerUser = await this.serviceHoursPerUser(user.userId);
      const tDifference = tHours - tHoursPerUser;
      const rDifference = rHours - rHoursPerUser;
      const sDifference = sHours - sHoursPerUser;

      workloadSummary.push({
        user: user,
        teachingHours: tHours,
        teachingHoursPerUser: tHoursPerUser,
        teachingDifference: tDifference,
        researchHours: rHours,
        researchHoursPerUser: rHoursPerUser,
        researchDifference: rDifference,
        serviceHours: sHours,
        serviceHoursPerUser: sHoursPerUser,
        serviceDifference: sDifference
      });
    }

    return workloadSummary;
  }
}
