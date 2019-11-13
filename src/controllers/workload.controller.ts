import * as AcademicAdministrationMethods from "./activity/academic-administration.controller";
import * as CommunityInstructionMethods from "./activity/community-instruction.controller";
import * as ExecutiveManagementMethods from "./activity/executive-management.controller";
import * as FormalInstructionMethods from "./activity/formal-instruction.controller";
import * as PersonnelDevelopmentMethods from "./activity/personnel-development.controller";
import * as PublicServiceMethods from "./activity/public-service.controller";
import * as ResearchMethods from "./activity/research.controller";
import * as SupervisionMethods from "./activity/supervision.controller";
import * as UserMethods from "./user.controller";
import * as WorkFocusMethods from "./work-focus.controller";
import * as AAWorkloadMethods from "./workload/academic-administration-workload.controller";
import * as CIWorkloadMethods from "./workload/community-instruction-workload.controller";
import * as EMWorkloadMethods from "./workload/executive-management-workload.controller";
import * as FIWorkloadMethods from "./workload/formal-instruction-workload.controller";
import * as PDWorkloadMethods from "./workload/personnel-development-workload.controller";
import * as PSWorkloadMethods from "./workload/public-service-workload.controller";
import * as RWorkloadMethods from "./workload/research-workload.controller";
import * as SWorkloadMethods from "./workload/supervision-workload.controller";
import IUser from "interfaces/user.interface";
import IAcademicAdministrationWorkload from "interfaces/workload/academic-administration-workload.interface";

let totalHoursPerUser = async (userId: any) => {
  const aaHours = await AcademicAdministrationMethods.academicAdministrationTotalHoursPerUser(
    userId
  );
  const ciHours = await CommunityInstructionMethods.communityInstructionTotalHoursPerUser(
    userId
  );
  const emHours = await ExecutiveManagementMethods.executiveManagementTotalHoursPerUser(
    userId
  );
  const fiHours = await FormalInstructionMethods.formalInstructionTotalHoursPerUser(
    userId
  );
  const pdHours = await PersonnelDevelopmentMethods.personnelDevelopmentTotalHoursPerUser(
    userId
  );
  const psHours = await PublicServiceMethods.publicServiceTotalHoursPerUser(
    userId
  );
  const rHours = await ResearchMethods.researchTotalHoursPerUser(userId);
  const sHours = await SupervisionMethods.supervisionTotalHoursPerUser(userId);
  let total = 0;
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
    console.log(error);
  }

  return total;
};
let teachingHoursPerUser = async (userId: string) => {
  const fiHours = await FormalInstructionMethods.formalInstructionTotalHoursPerUser(
    userId
  );
  const sHours = await SupervisionMethods.supervisionTotalHoursPerUser(userId);

  const total = fiHours + sHours;
  return total;
};
let researchHoursPerUser = async (userId: string) => {
  const aaHours = await AcademicAdministrationMethods.academicAdministrationTotalHoursPerUser(
    userId
  );
  const ciHours = await CommunityInstructionMethods.communityInstructionTotalHoursPerUser(
    userId
  );
  const emHours = await ExecutiveManagementMethods.executiveManagementTotalHoursPerUser(
    userId
  );
  const pdHours = await PersonnelDevelopmentMethods.personnelDevelopmentTotalHoursPerUser(
    userId
  );
  const psHours = await PublicServiceMethods.publicServiceTotalHoursPerUser(
    userId
  );
  const total = aaHours + ciHours + emHours + pdHours + psHours;
  return total;
};
let serviceHoursPerUser = async (userId: string) => {
  const rHours = await ResearchMethods.researchTotalHoursPerUser(userId);
  const total = rHours;

  return total;
};
let initializeWorkloads = async (userId: string) => {
  await deleteWorkloads(userId);
  await AAWorkloadMethods.initializeAAWorkload(userId);
  await CIWorkloadMethods.initializeCIWorkload(userId);
  await EMWorkloadMethods.initializeEMWorkload(userId);
  await FIWorkloadMethods.initializeFIWorkload(userId);
  await PDWorkloadMethods.initializePDWorkload(userId);
  await PSWorkloadMethods.initializePSWorkload(userId);
  await RWorkloadMethods.initializeRWorkload(userId);
  await SWorkloadMethods.initializeSWorkload(userId);
  console.log(`Workloads initialized for User: ${userId}`);
  return {};
};
let deleteWorkloads = async (userId: string) => {
  await AAWorkloadMethods.deleteAcademicAdministrationWorkload(userId);
  await CIWorkloadMethods.deleteCommunityInstructionWorkload(userId);
  await EMWorkloadMethods.deleteExecutiveManagementWorkload(userId);
  await FIWorkloadMethods.deleteFormalInstructionWorkload(userId);
  await PDWorkloadMethods.deletePersonnelDevelopmentWorkload(userId);
  await PSWorkloadMethods.deletePublicServiceWorkload(userId);
  await RWorkloadMethods.deleteResearchWorkload(userId);
  await SWorkloadMethods.deleteSupervisionWorkload(userId);
  console.log(`Workloads deleted for User: ${userId}`);
};
let calculateTotalWorkload = async (userId: string) => {
  // Delete current workloads for user
  await deleteWorkloads(userId);

  // Calculate and save workloads
  await AAWorkloadMethods.calculateAcademicAdministrationWorkload(userId);
  await CIWorkloadMethods.calculateCommunityInstructionWorkload(userId);
  await EMWorkloadMethods.calculateExecutiveManagementWorkload(userId);
  await FIWorkloadMethods.calculateFormalInstructionWorkload(userId);
  await PDWorkloadMethods.calculatePersonnelDevelopmentWorkload(userId);
  await PSWorkloadMethods.calculatePublicServiceWorkload(userId);
  await RWorkloadMethods.calculateResearchWorkload(userId);
  await SWorkloadMethods.calculateSupervisionWorkload(userId);

  console.log("Workloads calculated!");

  // Return totalWorkload only afterwards;
  return await totalWorkload(userId);
};
let totalWorkload = async (userId: string) => {
  const aa = await AAWorkloadMethods.academicAdministrationWorkload(userId);
  const ci = await CIWorkloadMethods.communityInstructionWorkload(userId);
  const em = await EMWorkloadMethods.executiveManagementWorkload(userId);
  const fi = await FIWorkloadMethods.formalInstructionWorkload(userId);
  const pd = await PDWorkloadMethods.personnelDevelopmentWorkload(userId);
  const ps = await PSWorkloadMethods.publicServiceWorkload(userId);
  const r = await RWorkloadMethods.researchWorkload(userId);
  const s = await SWorkloadMethods.supervisionWorkload(userId);

  return {
    academicAdministrationWorkload: aa,
    communityInstructionWorkload: ci,
    executiveManagementWorkload: em,
    formalInstructionWorkload: fi,
    personnelDevelopmentWorkload: pd,
    publicServiceWorkload: ps,
    researchWorkload: r,
    supervisionWorkload: s
  };
};
let workloadSummaries = async () => {
  let workloadSummary = [];
  const users: any[] = await UserMethods.users();
  for (let user of users) {
    const tHours = await WorkFocusMethods.teachingHours(user.userId);
    const rHours = await WorkFocusMethods.researchHours(user.userId);
    const sHours = await WorkFocusMethods.serviceHours(user.userId);
    const tHoursPerUser = await teachingHoursPerUser(user.userId);
    const rHoursPerUser = await researchHoursPerUser(user.userId);
    const sHoursPerUser = await serviceHoursPerUser(user.userId);
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
};

export {
  totalHoursPerUser,
  teachingHoursPerUser,
  researchHoursPerUser,
  serviceHoursPerUser,
  initializeWorkloads,
  deleteWorkloads,
  calculateTotalWorkload,
  totalWorkload,
  workloadSummaries
};
