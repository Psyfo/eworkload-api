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

  try {
    const total =
      aaHours +
      ciHours +
      emHours +
      fiHours +
      pdHours +
      psHours +
      rHours +
      sHours;

    if (isNaN(total)) {
      throw new Error('Not a number');
    }

    return total;
  } catch (error) {
    console.log(error);
  }
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
  try {
    // Get calculated workloads
    let aa = await AAWorkloadMethods.calculateAcademicAdministrationWorkload(
      userId
    );
    let ci = await CIWorkloadMethods.calculateCommunityInstructionWorkload(
      userId
    );
    let em = await EMWorkloadMethods.calculateExecutiveManagementWorkload(
      userId
    );
    let fi = await FIWorkloadMethods.calculateFormalInstructionWorkload(userId);
    let pd = await PDWorkloadMethods.calculatePersonnelDevelopmentWorkload(
      userId
    );
    let ps = await PSWorkloadMethods.calculatePublicServiceWorkload(userId);
    let r = await RWorkloadMethods.calculateResearchWorkload(userId);
    let s = await SWorkloadMethods.calculateSupervisionWorkload(userId);

    // Write workloads
    await aa.save();
    await ci.save();
    await em.save();
    await fi.save();
    await pd.save();
    await ps.save();
    await r.save();
    await s.save();
  } catch (error) {
    console.log(error);
  }
  console.log('Workloads calculated!');

  // Return totalWorkload only afterwards;
  return await totalWorkload(userId);
};

let totalWorkload = async userId => {
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
  totalWorkload,
  workloadSummaries
};
