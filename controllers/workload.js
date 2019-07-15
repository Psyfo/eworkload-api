import * as AcademicAdministrationMethods from './activity/academic-administration';
import * as CommunityInstructionMethods from './activity/community-instruction';
import * as ExecutiveManagementMethods from './activity/executive-management';
import * as FormalInstructionMethods from './activity/formal-instruction';
import * as PersonnelDevelopmentMethods from './activity/personnel-development';
import * as PublicServiceMethods from './activity/public-service';
import * as ResearchMethods from './activity/research';
import * as SupervisionMethods from './activity/supervision';

let academicAdministrationWorkloadDataPerUser = async userId => {
  let academicAdministrationWorkloadData = [];
  let academicAdministrationActivities = await AcademicAdministrationMethods.academicAdministrationActivitiesByUser(
    userId
  );

  for (let academicAdministrationActivity of academicAdministrationActivities) {
    let academicAdministrationTotalHoursPerActivity = await AcademicAdministrationMethods.academicAdministrationTotalHoursPerActivity(
      academicAdministrationActivity.activityId
    );
    let academicAdministrationPercentageOfWorkFocusPerActivity = await AcademicAdministrationMethods.academicAdministrationPercentageOfWorkFocusPerActivity(
      academicAdministrationActivity.activityId
    );
    let academicAdministrationPercentageOfAnnualPerActivity = await AcademicAdministrationMethods.academicAdministrationPercentageOfAnnualPerActivity(
      academicAdministrationActivity.activityId
    );
    academicAdministrationWorkloadData.push({
      academicAdministrationTotalHoursPerActivity: academicAdministrationTotalHoursPerActivity,
      academicAdministrationPercentageOfWorkFocusPerActivity: academicAdministrationPercentageOfWorkFocusPerActivity,
      academicAdministrationPercentageOfAnnualPerActivity: academicAdministrationPercentageOfAnnualPerActivity
    });
  }
  let aaGlobalTarrif = await AcademicAdministrationMethods.academicAdministrationGlobalTarrif();
  let aaTotalHoursPerUser = await AcademicAdministrationMethods.academicAdministrationTotalHoursPerUser(
    userId
  );
  let aaPercentageOfWorkFocusPerUser = await AcademicAdministrationMethods.academicAdministrationPercentageOfWorkFocusPerUser(
    userId
  );
  let aaPercentageOfAnnualPerUser = await AcademicAdministrationMethods.academicAdministrationPercentageOfAnnualPerUser(
    userId
  );

  return {
    academicAdministrationWorkloadData: academicAdministrationWorkloadData,
    academicAdministrationGlobalTarrif: aaGlobalTarrif,
    academicAdministrationTotalHoursPerUser: aaTotalHoursPerUser,
    academicAdministrationPercentageOfWorkFocusPerUser: aaPercentageOfWorkFocusPerUser,
    academicAdministrationPercentageOfAnnualPerUser: aaPercentageOfAnnualPerUser
  };
};
let communityInstructionWorkloadDataPerUser = async userId => {
  let communityInstructionWorkloadData = [];
  let communityInstructionActivities = await CommunityInstructionMethods.communityInstructionActivitiesByUser(
    userId
  );

  for (let communityInstructionActivity of communityInstructionActivities) {
    let communityInstructionTotalHoursPerActivity = await CommunityInstructionMethods.communityInstructionTotalHoursPerActivity(
      communityInstructionActivity.activityId
    );
    let communityInstructionPercentageOfWorkFocusPerActivity = await CommunityInstructionMethods.communityInstructionPercentageOfWorkFocusPerActivity(
      communityInstructionActivity.activityId
    );
    let communityInstructionPercentageOfAnnualPerActivity = await CommunityInstructionMethods.communityInstructionPercentageOfAnnualPerActivity(
      communityInstructionActivity.activityId
    );
    communityInstructionWorkloadData.push({
      communityInstructionTotalHoursPerActivity: communityInstructionTotalHoursPerActivity,
      communityInstructionPercentageOfWorkFocusPerActivity: communityInstructionPercentageOfWorkFocusPerActivity,
      communityInstructionPercentageOfAnnualPerActivity: communityInstructionPercentageOfAnnualPerActivity
    });
  }
  let ciGlobalTarrif = await CommunityInstructionMethods.communityInstructionGlobalTarrif();
  let ciTotalHoursPerUser = await CommunityInstructionMethods.communityInstructionTotalHoursPerUser(
    userId
  );
  let ciPercentageOfWorkFocusPerUser = await CommunityInstructionMethods.communityInstructionPercentageOfWorkFocusPerUser(
    userId
  );
  let ciPercentageOfAnnualPerUser = await CommunityInstructionMethods.communityInstructionPercentageOfAnnualPerUser(
    userId
  );

  return {
    communityInstructionWorkloadData: communityInstructionWorkloadData,
    communityInstructionGlobalTarrif: ciGlobalTarrif,
    communityInstructionTotalHoursPerUser: ciTotalHoursPerUser,
    communityInstructionPercentageOfWorkFocusPerUser: ciPercentageOfWorkFocusPerUser,
    communityInstructionPercentageOfAnnualPerUser: ciPercentageOfAnnualPerUser
  };
};
let executiveManagementWorkloadDataPerUser = async userId => {
  let executiveManagementWorkloadData = [];
  let executiveManagementActivities = await ExecutiveManagementMethods.executiveManagementActivitiesByUser(
    userId
  );

  for (let executiveManagementActivity of executiveManagementActivities) {
    let executiveManagementTotalHoursPerActivity = await ExecutiveManagementMethods.executiveManagementTotalHoursPerActivity(
      executiveManagementActivity.activityId
    );
    let executiveManagementPercentageOfWorkFocusPerActivity = await ExecutiveManagementMethods.executiveManagementPercentageOfWorkFocusPerActivity(
      executiveManagementActivity.activityId
    );
    let executiveManagementPercentageOfAnnualPerActivity = await ExecutiveManagementMethods.executiveManagementPercentageOfAnnualPerActivity(
      executiveManagementActivity.activityId
    );
    executiveManagementWorkloadData.push({
      executiveManagementTotalHoursPerActivity: executiveManagementTotalHoursPerActivity,
      executiveManagementPercentageOfWorkFocusPerActivity: executiveManagementPercentageOfWorkFocusPerActivity,
      executiveManagementPercentageOfAnnualPerActivity: executiveManagementPercentageOfAnnualPerActivity
    });
  }
  let emGlobalTarrif = await ExecutiveManagementMethods.executiveManagementGlobalTarrif();
  let emTotalHoursPerUser = await ExecutiveManagementMethods.executiveManagementTotalHoursPerUser(
    userId
  );
  let emPercentageOfWorkFocusPerUser = await ExecutiveManagementMethods.executiveManagementPercentageOfWorkFocusPerUser(
    userId
  );
  let emPercentageOfAnnualPerUser = await ExecutiveManagementMethods.executiveManagementPercentageOfAnnualPerUser(
    userId
  );

  return {
    executiveManagementWorkloadData: executiveManagementWorkloadData,
    executiveManagementGlobalTarrif: emGlobalTarrif,
    executiveManagementTotalHoursPerUser: emTotalHoursPerUser,
    executiveManagementPercentageOfWorkFocusPerUser: emPercentageOfWorkFocusPerUser,
    executiveManagementPercentageOfAnnualPerUser: emPercentageOfAnnualPerUser
  };
};
let formalInstructionWorkloadDataPerUser = async userId => {
  let formalInstructionWorkloadData = [];

  let formalInstructionActivities = await FormalInstructionMethods.formalInstructionActivitiesByUser(
    userId
  );

  for (let formalInstructionActivity of formalInstructionActivities) {
    let formalInstructionBaseContactHours = await FormalInstructionMethods.formalInstructionBaseContactHours(
      formalInstructionActivity.activityId
    );
    let formalInstructionCoordinationHours = await FormalInstructionMethods.formalInstructionCoordinationHours(
      formalInstructionActivity.activityId
    );
    let formalInstructionStudentSupportHours = await FormalInstructionMethods.formalInstructionStudentSupportHours(
      formalInstructionActivity.activityId
    );
    let formalInstructionPreparationTimeHours = await FormalInstructionMethods.formalInstructionPreparationTimeHours(
      formalInstructionActivity.activityId
    );
    let formalInstructionAssessmentSettingHours = await FormalInstructionMethods.formalInstructionAssessmentSettingHours(
      formalInstructionActivity.activityId
    );
    let formalInstructionExamMarkingHours = await FormalInstructionMethods.formalInstructionExamMarkingHours(
      formalInstructionActivity.activityId
    );
    let formalInstructionCourseworkMarkingHours = await FormalInstructionMethods.formalInstructionCourseworkMarkingHours(
      formalInstructionActivity.activityId
    );
    let formalInstructionFeedbackHours = await FormalInstructionMethods.formalInstructionFeedbackHours(
      formalInstructionActivity.activityId
    );
    let formalInstructionFormativeAssessmentHours = await FormalInstructionMethods.formalInstructionFormativeAssessmentHours(
      formalInstructionActivity.activityId
    );
    let formalInstructionModerationHours = await FormalInstructionMethods.formalInstructionModerationHours(
      formalInstructionActivity.activityId
    );
    let formalInstructionOtherHoursPerActivity = await FormalInstructionMethods.formalInstructionOtherHoursPerActivity(
      formalInstructionActivity.activityId
    );
    let formalInstructionTotalHoursPerActivity = await FormalInstructionMethods.formalInstructionTotalHoursPerActivity(
      formalInstructionActivity.activityId
    );
    let formalInstructionPercentageOfWorkFocusPerActivity = await FormalInstructionMethods.formalInstructionPercentageOfWorkFocusPerActivity(
      formalInstructionActivity.activityId
    );
    let formalInstructionPercentageOfAnnualPerActivity = await FormalInstructionMethods.formalInstructionPercentageOfAnnualPerActivity(
      formalInstructionActivity.activityId
    );
    formalInstructionWorkloadData.push({
      formalInstructionBaseContactHours: formalInstructionBaseContactHours,
      formalInstructionCoordinationHours: formalInstructionCoordinationHours,
      formalInstructionStudentSupportHours: formalInstructionStudentSupportHours,
      formalInstructionPreparationTimeHours: formalInstructionPreparationTimeHours,
      formalInstructionAssessmentSettingHours: formalInstructionAssessmentSettingHours,
      formalInstructionExamMarkingHours: formalInstructionExamMarkingHours,
      formalInstructionCourseworkMarkingHours: formalInstructionCourseworkMarkingHours,
      formalInstructionFeedbackHours: formalInstructionFeedbackHours,
      formalInstructionFormativeAssessmentHours: formalInstructionFormativeAssessmentHours,
      formalInstructionModerationHours: formalInstructionModerationHours,
      formalInstructionOtherHoursPerActivity: formalInstructionOtherHoursPerActivity,
      formalInstructionTotalHoursPerActivity: formalInstructionTotalHoursPerActivity,
      formalInstructionPercentageOfWorkFocusPerActivity: formalInstructionPercentageOfWorkFocusPerActivity,
      formalInstructionPercentageOfAnnualPerActivity: formalInstructionPercentageOfAnnualPerActivity
    });
  }
  let fiTotalHoursPerUser = await FormalInstructionMethods.formalInstructionTotalHoursPerUser(
    userId
  );
  let fiPercentageOfWorkFocusPerUser = await FormalInstructionMethods.formalInstructionPercentageOfWorkFocusPerUser(
    userId
  );
  let fiPercentageOfAnnualPerUser = await FormalInstructionMethods.formalInstructionPercentageOfAnnualPerUser(
    userId
  );

  return {
    formalInstructionWorkloadData: formalInstructionWorkloadData,
    formalInstructionTotalHoursPerUser: fiTotalHoursPerUser,
    formalInstructionPercentageOfWorkFocusPerUser: fiPercentageOfWorkFocusPerUser,
    formalInstructionPercentageOfAnnualPerUser: fiPercentageOfAnnualPerUser
  };
};
let personnelDevelopmentWorkloadDataPerUser = async userId => {
  let personnelDevelopmentWorkloadData = [];
  let personnelDevelopmentActivities = await PersonnelDevelopmentMethods.personnelDevelopmentActivitiesByUser(
    userId
  );

  for (let personnelDevelopmentActivity of personnelDevelopmentActivities) {
    let personnelDevelopmentTotalHoursPerActivity = await PersonnelDevelopmentMethods.personnelDevelopmentTotalHoursPerActivity(
      personnelDevelopmentActivity.activityId
    );
    let personnelDevelopmentPercentageOfWorkFocusPerActivity = await PersonnelDevelopmentMethods.personnelDevelopmentPercentageOfWorkFocusPerActivity(
      personnelDevelopmentActivity.activityId
    );
    let personnelDevelopmentPercentageOfAnnualPerActivity = await PersonnelDevelopmentMethods.personnelDevelopmentPercentageOfAnnualPerActivity(
      personnelDevelopmentActivity.activityId
    );
    personnelDevelopmentWorkloadData.push({
      personnelDevelopmentTotalHoursPerActivity: personnelDevelopmentTotalHoursPerActivity,
      personnelDevelopmentPercentageOfWorkFocusPerActivity: personnelDevelopmentPercentageOfWorkFocusPerActivity,
      personnelDevelopmentPercentageOfAnnualPerActivity: personnelDevelopmentPercentageOfAnnualPerActivity
    });
  }
  let pdGlobalTarrif = await PersonnelDevelopmentMethods.personnelDevelopmentGlobalTarrif();
  let pdTotalHoursPerUser = await PersonnelDevelopmentMethods.personnelDevelopmentTotalHoursPerUser(
    userId
  );
  let pdPercentageOfWorkFocusPerUser = await PersonnelDevelopmentMethods.personnelDevelopmentPercentageOfWorkFocusPerUser(
    userId
  );
  let pdPercentageOfAnnualPerUser = await PersonnelDevelopmentMethods.personnelDevelopmentPercentageOfAnnualPerUser(
    userId
  );

  return {
    personnelDevelopmentWorkloadData: personnelDevelopmentWorkloadData,
    personnelDevelopmentGlobalTarrif: pdGlobalTarrif,
    personnelDevelopmentTotalHoursPerUser: pdTotalHoursPerUser,
    personnelDevelopmentPercentageOfWorkFocusPerUser: pdPercentageOfWorkFocusPerUser,
    personnelDevelopmentPercentageOfAnnualPerUser: pdPercentageOfAnnualPerUser
  };
};
let publicServiceWorkloadDataPerUser = async userId => {
  let publicServiceWorkloadData = [];
  let publicServiceActivities = await PublicServiceMethods.publicServiceActivitiesByUser(
    userId
  );

  for (let publicServiceActivity of publicServiceActivities) {
    let publicServiceTotalHoursPerActivity = await PublicServiceMethods.publicServiceTotalHoursPerActivity(
      publicServiceActivity.activityId
    );
    let publicServicePercentageOfWorkFocusPerActivity = await PublicServiceMethods.publicServicePercentageOfWorkFocusPerActivity(
      publicServiceActivity.activityId
    );
    let publicServicePercentageOfAnnualPerActivity = await PublicServiceMethods.publicServicePercentageOfAnnualPerActivity(
      publicServiceActivity.activityId
    );
    publicServiceWorkloadData.push({
      publicServiceTotalHoursPerActivity: publicServiceTotalHoursPerActivity,
      publicServicePercentageOfWorkFocusPerActivity: publicServicePercentageOfWorkFocusPerActivity,
      publicServicePercentageOfAnnualPerActivity: publicServicePercentageOfAnnualPerActivity
    });
  }
  let psGlobalTarrif = await PublicServiceMethods.publicServiceGlobalTarrif();
  let psTotalHoursPerUser = await PublicServiceMethods.publicServiceTotalHoursPerUser(
    userId
  );
  let psPercentageOfWorkFocusPerUser = await PublicServiceMethods.publicServicePercentageOfWorkFocusPerUser(
    userId
  );
  let psPercentageOfAnnualPerUser = await PublicServiceMethods.publicServicePercentageOfAnnualPerUser(
    userId
  );

  return {
    publicServiceWorkloadData: publicServiceWorkloadData,
    publicServiceGlobalTarrif: psGlobalTarrif,
    publicServiceTotalHoursPerUser: psTotalHoursPerUser,
    publicServicePercentageOfWorkFocusPerUser: psPercentageOfWorkFocusPerUser,
    publicServicePercentageOfAnnualPerUser: psPercentageOfAnnualPerUser
  };
};
let researchWorkloadDataPerUser = async userId => {
  let researchWorkloadData = [];
  let researchActivities = await ResearchMethods.researchActivitiesByUser(
    userId
  );

  for (let researchActivity of researchActivities) {
    let researchTotalHoursPerActivity = await ResearchMethods.researchTotalHoursPerActivity(
      researchActivity.activityId
    );
    let researchPercentageOfWorkFocusPerActivity = await ResearchMethods.researchPercentageOfWorkFocusPerActivity(
      researchActivity.activityId
    );
    let researchPercentageOfAnnualPerActivity = await ResearchMethods.researchPercentageOfAnnualPerActivity(
      researchActivity.activityId
    );
    researchWorkloadData.push({
      researchTotalHoursPerActivity: researchTotalHoursPerActivity,
      researchPercentageOfWorkFocusPerActivity: researchPercentageOfWorkFocusPerActivity,
      researchPercentageOfAnnualPerActivity: researchPercentageOfAnnualPerActivity
    });
  }
  let rGlobalTarrif = await ResearchMethods.researchGlobalTarrif();
  let rTotalHoursPerUser = await ResearchMethods.researchTotalHoursPerUser(
    userId
  );
  let rPercentageOfWorkFocusPerUser = await ResearchMethods.researchPercentageOfWorkFocusPerUser(
    userId
  );
  let rPercentageOfAnnualPerUser = await ResearchMethods.researchPercentageOfAnnualPerUser(
    userId
  );

  return {
    researchWorkloadData: researchWorkloadData,
    researchGlobalTarrif: rGlobalTarrif,
    researchTotalHoursPerUser: rTotalHoursPerUser,
    researchPercentageOfWorkFocusPerUser: rPercentageOfWorkFocusPerUser,
    researchPercentageOfAnnualPerUser: rPercentageOfAnnualPerUser
  };
};
let supervisionWorkloadDataPerUser = async userId => {
  let supervisionWorkloadData = [];
  let supervisionActivities = await SupervisionMethods.supervisionActivitiesByUser(
    userId
  );

  for (let supervisionActivity of supervisionActivities) {
    let supervisionTotalHoursPerActivity = await SupervisionMethods.supervisionTotalHoursPerActivity(
      supervisionActivity.activityId
    );
    let supervisionPercentageOfWorkFocusPerActivity = await SupervisionMethods.supervisionPercentageOfWorkFocusPerActivity(
      supervisionActivity.activityId
    );
    let supervisionPercentageOfAnnualPerActivity = await SupervisionMethods.supervisionPercentageOfAnnualPerActivity(
      supervisionActivity.activityId
    );
    supervisionWorkloadData.push({
      supervisionTotalHoursPerActivity: supervisionTotalHoursPerActivity,
      supervisionPercentageOfWorkFocusPerActivity: supervisionPercentageOfWorkFocusPerActivity,
      supervisionPercentageOfAnnualPerActivity: supervisionPercentageOfAnnualPerActivity
    });
  }
  let svGlobalTarrif = await SupervisionMethods.supervisionGlobalTarrif();
  let svTotalHoursPerUser = await SupervisionMethods.supervisionTotalHoursPerUser(
    userId
  );
  let svPercentageOfWorkFocusPerUser = await SupervisionMethods.supervisionPercentageOfWorkFocusPerUser(
    userId
  );
  let svPercentageOfAnnualPerUser = await SupervisionMethods.supervisionPercentageOfAnnualPerUser(
    userId
  );

  return {
    supervisionWorkloadData: supervisionWorkloadData,
    supervisionGlobalTarrif: svGlobalTarrif,
    supervisionTotalHoursPerUser: svTotalHoursPerUser,
    supervisionPercentageOfWorkFocusPerUser: svPercentageOfWorkFocusPerUser,
    supervisionPercentageOfAnnualPerUser: svPercentageOfAnnualPerUser
  };
};

export {
  academicAdministrationWorkloadDataPerUser,
  communityInstructionWorkloadDataPerUser,
  executiveManagementWorkloadDataPerUser,
  formalInstructionWorkloadDataPerUser,
  personnelDevelopmentWorkloadDataPerUser,
  publicServiceWorkloadDataPerUser,
  researchWorkloadDataPerUser,
  supervisionWorkloadDataPerUser
};
