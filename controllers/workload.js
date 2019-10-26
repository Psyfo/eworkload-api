import * as AcademicAdministrationMethods from './activity/academic-administration';
import * as CommunityInstructionMethods from './activity/community-instruction';
import * as ExecutiveManagementMethods from './activity/executive-management';
import * as FormalInstructionMethods from './activity/formal-instruction';
import * as PersonnelDevelopmentMethods from './activity/personnel-development';
import * as PublicServiceMethods from './activity/public-service';
import * as ResearchMethods from './activity/research';
import * as SupervisionMethods from './activity/supervision';
import * as UserMethods from './../controllers/user';
import * as WorkFocusMethods from './../controllers/work-focus';
import * as AAWorkloadMethods from './workload/academic-administration';
import * as CIWorkloadMethods from './workload/community-instruction';
import * as EMWorkloadMethods from './workload/executive-management';
import * as FIWorkloadMethods from './workload/formal-instruction';
import * as PDWorkloadMethods from './workload/personnel-development';
import * as PSWorkloadMethods from './workload/public-service';
import * as RWorkloadMethods from './workload/research';
import * as SWorkloadMethods from './workload/supervision';

let totalHoursPerUser = async userId => {
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

  const total =
    aaHours + ciHours + emHours + fiHours + pdHours + psHours + rHours + sHours;

  return total;
};
let teachingHoursPerUser = async userId => {
  const fiHours = await FormalInstructionMethods.formalInstructionTotalHoursPerUser(
    userId
  );
  const sHours = await SupervisionMethods.supervisionTotalHoursPerUser(userId);

  const total = fiHours + sHours;
  return total;
};
let researchHoursPerUser = async userId => {
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
let serviceHoursPerUser = async userId => {
  const rHours = await ResearchMethods.researchTotalHoursPerUser(userId);
  const total = rHours;

  return total;
};

let initializeWorkloads = async userId => {
  await AAWorkloadMethods.initializeAAWorkload(userId);
  await CIWorkloadMethods.initializeCIWorkload(userId);
  await EMWorkloadMethods.initializeEMWorkload(userId);
  await FIWorkloadMethods.initializeFIWorkload(userId);
  await PDWorkloadMethods.initializePDWorkload(userId);
  await PSWorkloadMethods.initializePSWorkload(userId);
  await RWorkloadMethods.initializeRWorkload(userId);
  await SWorkloadMethods.initializeSWorkload(userId);
};
let calculateTotalWorkload = async userId => {
  // Write workload for all activities
  try {
    await AAWorkloadMethods.addAcademicAdministrationWorkload(userId);
    await CIWorkloadMethods.addCommunityInstructionWorkload(userId);
    await EMWorkloadMethods.addExecutiveManagementWorkload(userId);
    await FIWorkloadMethods.addFormalInstructionWorkload(userId);
    await PDWorkloadMethods.addPersonnelDevelopmentWorkload(userId);
    await PSWorkloadMethods.addPublicServiceWorkload(userId);
    await RWorkloadMethods.addResearchWorkload(userId);
    await SWorkloadMethods.addSupervisionWorkload(userId);
  } catch (error) {
    console.log(error);
  }
  console.log('Done! Workloads calculated!');
};

let workloadSummaries = async () => {
  let workloadSummary = [];
  const users = await UserMethods.users();
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
  calculateTotalWorkload,
  workloadSummaries
};
