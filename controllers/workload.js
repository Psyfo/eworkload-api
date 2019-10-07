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

import AcademicAdministrationActivity from './../models/activity/academic-administration-activity';
import ExecutiveManagementActivity from './../models/activity/executive-management-activity';
import CommunityInstructionActivity from './../models/activity/community-instruction-activity';
import FormalInstructionActivity from './../models/activity/formal-instruction-activity';
import PersonnelDevelopmentActivity from './../models/activity/personnel-development-activity';
import PublicServiceActivity from './../models/activity/public-service-activity';
import ResearchActivity from './../models/activity/research-activity';
import SupervisionActivity from './../models/activity/supervision-activity';

let academicAdministrationWorkloadDataPerUser = async userId => {
  let academicAdministrationWorkloadData = [];
  let academicAdministrationActivities = await AcademicAdministrationActivity.find(
    { userId: userId }
  );

  for (let academicAdministrationActivity of academicAdministrationActivities) {
    let activity = await AcademicAdministrationMethods.academicAdministrationActivity(
      academicAdministrationActivity.activityId
    );
    let academicAdministrationTotalHoursPerActivity = await AcademicAdministrationMethods.academicAdministrationTotalHoursPerActivity(
      academicAdministrationActivity.activityId
    );
    let academicAdministrationPercentageOfWorkFocusPerActivity = await AcademicAdministrationMethods.academicAdministrationPercentageOfWorkFocusPerActivity(
      academicAdministrationActivity.activityId
    );
    let academicAdministrationPercentageOfAnnualHoursPerActivity = await AcademicAdministrationMethods.academicAdministrationPercentageOfAnnualHoursPerActivity(
      academicAdministrationActivity.activityId
    );
    let academicAdministrationPercentageOfTotalHoursPerActivity = await AcademicAdministrationMethods.academicAdministrationPercentageOfTotalHoursPerActivity(
      academicAdministrationActivity.activityId
    );
    academicAdministrationWorkloadData.push({
      academicAdministrationActivity: activity,
      academicAdministrationTotalHoursPerActivity: academicAdministrationTotalHoursPerActivity,
      academicAdministrationPercentageOfWorkFocusPerActivity: academicAdministrationPercentageOfWorkFocusPerActivity,
      academicAdministrationPercentageOfAnnualHoursPerActivity: academicAdministrationPercentageOfAnnualHoursPerActivity,
      academicAdministrationPercentageOfTotalHoursPerActivity: academicAdministrationPercentageOfTotalHoursPerActivity
    });
  }
  let aaGlobalTarrif = await AcademicAdministrationMethods.academicAdministrationGlobalTarrif();
  let aaTotalHoursPerUser = await AcademicAdministrationMethods.academicAdministrationTotalHoursPerUser(
    userId
  );
  let aaPercentageOfWorkFocusPerUser = await AcademicAdministrationMethods.academicAdministrationPercentageOfWorkFocusPerUser(
    userId
  );
  let aaPercentageOfAnnualHoursPerUser = await AcademicAdministrationMethods.academicAdministrationPercentageOfAnnualHoursPerUser(
    userId
  );
  let aaPercentageOfTotalHoursPerUser = await AcademicAdministrationMethods.academicAdministrationPercentageOfTotalHoursPerUser(
    userId
  );

  return {
    academicAdministrationWorkloadData: academicAdministrationWorkloadData,
    academicAdministrationGlobalTarrif: aaGlobalTarrif,
    academicAdministrationTotalHoursPerUser: aaTotalHoursPerUser,
    academicAdministrationPercentageOfWorkFocusPerUser: aaPercentageOfWorkFocusPerUser,
    academicAdministrationPercentageOfAnnualHoursPerUser: aaPercentageOfAnnualHoursPerUser,
    academicAdministrationPercentageOfTotalHoursPerUser: aaPercentageOfTotalHoursPerUser
  };
};
let communityInstructionWorkloadDataPerUser = async userId => {
  let communityInstructionWorkloadData = [];
  let communityInstructionActivities = await CommunityInstructionActivity.find({
    userId: userId
  });

  for (let communityInstructionActivity of communityInstructionActivities) {
    let activity = communityInstructionActivity;
    let communityInstructionTotalHoursPerActivity = await CommunityInstructionMethods.communityInstructionTotalHoursPerActivity(
      communityInstructionActivity.activityId
    );
    let communityInstructionPercentageOfWorkFocusPerActivity = await CommunityInstructionMethods.communityInstructionPercentageOfWorkFocusPerActivity(
      communityInstructionActivity.activityId
    );
    let communityInstructionPercentageOfAnnualHoursPerActivity = await CommunityInstructionMethods.communityInstructionPercentageOfAnnualHoursPerActivity(
      communityInstructionActivity.activityId
    );
    let communityInstructionPercentageOfTotalHoursPerActivity = await CommunityInstructionMethods.communityInstructionPercentageOfTotalHoursPerActivity(
      communityInstructionActivity.activityId
    );
    communityInstructionWorkloadData.push({
      communityInstructionActivity: activity,
      communityInstructionTotalHoursPerActivity: communityInstructionTotalHoursPerActivity,
      communityInstructionPercentageOfWorkFocusPerActivity: communityInstructionPercentageOfWorkFocusPerActivity,
      communityInstructionPercentageOfAnnualHoursPerActivity: communityInstructionPercentageOfAnnualHoursPerActivity,
      communityInstructionPercentageOfTotalHoursPerActivity: communityInstructionPercentageOfTotalHoursPerActivity
    });
  }
  let ciGlobalTarrif = await CommunityInstructionMethods.communityInstructionGlobalTarrif();
  let ciTotalHoursPerUser = await CommunityInstructionMethods.communityInstructionTotalHoursPerUser(
    userId
  );
  let ciPercentageOfWorkFocusPerUser = await CommunityInstructionMethods.communityInstructionPercentageOfWorkFocusPerUser(
    userId
  );
  let ciPercentageOfAnnualHoursPerUser = await CommunityInstructionMethods.communityInstructionPercentageOfAnnualHoursPerUser(
    userId
  );
  let ciPercentageOfTotalHoursPerUser = await CommunityInstructionMethods.communityInstructionPercentageOfTotalHoursPerUser(
    userId
  );

  return {
    communityInstructionWorkloadData: communityInstructionWorkloadData,
    communityInstructionGlobalTarrif: ciGlobalTarrif,
    communityInstructionTotalHoursPerUser: ciTotalHoursPerUser,
    communityInstructionPercentageOfWorkFocusPerUser: ciPercentageOfWorkFocusPerUser,
    communityInstructionPercentageOfAnnualHoursPerUser: ciPercentageOfAnnualHoursPerUser,
    communityInstructionPercentageOfTotalHoursPerUser: ciPercentageOfTotalHoursPerUser
  };
};
let executiveManagementWorkloadDataPerUser = async userId => {
  let executiveManagementWorkloadData = [];
  let executiveManagementActivities = await ExecutiveManagementActivity.find({
    userId: userId
  });

  for (let executiveManagementActivity of executiveManagementActivities) {
    let activity = executiveManagementActivity;
    let executiveManagementTotalHoursPerActivity = await ExecutiveManagementMethods.executiveManagementTotalHoursPerActivity(
      executiveManagementActivity.activityId
    );
    let executiveManagementPercentageOfWorkFocusPerActivity = await ExecutiveManagementMethods.executiveManagementPercentageOfWorkFocusPerActivity(
      executiveManagementActivity.activityId
    );
    let executiveManagementPercentageOfAnnualHoursPerActivity = await ExecutiveManagementMethods.executiveManagementPercentageOfAnnualHoursPerActivity(
      executiveManagementActivity.activityId
    );
    let executiveManagementPercentageOfTotalHoursPerActivity = await ExecutiveManagementMethods.executiveManagementPercentageOfTotalHoursPerActivity(
      executiveManagementActivity.activityId
    );
    executiveManagementWorkloadData.push({
      executiveManagementActivity: activity,
      executiveManagementTotalHoursPerActivity: executiveManagementTotalHoursPerActivity,
      executiveManagementPercentageOfWorkFocusPerActivity: executiveManagementPercentageOfWorkFocusPerActivity,
      executiveManagementPercentageOfAnnualHoursPerActivity: executiveManagementPercentageOfAnnualHoursPerActivity,
      executiveManagementPercentageOfTotalHoursPerActivity: executiveManagementPercentageOfTotalHoursPerActivity
    });
  }
  let emGlobalTarrif = await ExecutiveManagementMethods.executiveManagementGlobalTarrif();
  let emTotalHoursPerUser = await ExecutiveManagementMethods.executiveManagementTotalHoursPerUser(
    userId
  );
  let emPercentageOfWorkFocusPerUser = await ExecutiveManagementMethods.executiveManagementPercentageOfWorkFocusPerUser(
    userId
  );
  let emPercentageOfAnnualHoursPerUser = await ExecutiveManagementMethods.executiveManagementPercentageOfAnnualHoursPerUser(
    userId
  );
  let emPercentageOfTotalHoursPerUser = await ExecutiveManagementMethods.executiveManagementPercentageOfTotalHoursPerUser(
    userId
  );

  return {
    executiveManagementWorkloadData: executiveManagementWorkloadData,
    executiveManagementGlobalTarrif: emGlobalTarrif,
    executiveManagementTotalHoursPerUser: emTotalHoursPerUser,
    executiveManagementPercentageOfWorkFocusPerUser: emPercentageOfWorkFocusPerUser,
    executiveManagementPercentageOfAnnualHoursPerUser: emPercentageOfAnnualHoursPerUser,
    executiveManagementPercentageOfTotalHoursPerUser: emPercentageOfTotalHoursPerUser
  };
};
let formalInstructionWorkloadDataPerUser = async userId => {
  let formalInstructionWorkloadData = [];

  let formalInstructionActivities = await FormalInstructionActivity.find({
    userId: userId
  })
    .populate('module')
    .populate('block')
    .populate('offeringType')
    .populate('qualification');

  for (let formalInstructionActivity of formalInstructionActivities) {
    let activity = formalInstructionActivity;
    let formalInstructionStudentsEnrolled = await FormalInstructionMethods.formalInstructionStudentsEnrolled(
      formalInstructionActivity.activityId
    );
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
    let formalInstructionPercentageOfAnnualHoursPerActivity = await FormalInstructionMethods.formalInstructionPercentageOfAnnualHoursPerActivity(
      formalInstructionActivity.activityId
    );
    let formalInstructionPercentageOfTotalHoursPerActivity = await FormalInstructionMethods.formalInstructionPercentageOfTotalHoursPerActivity(
      formalInstructionActivity.activityId
    );

    formalInstructionWorkloadData.push({
      formalInstructionActivity: activity,
      formalInstructionStudentsEnrolled: formalInstructionStudentsEnrolled,
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
      formalInstructionPercentageOfAnnualHoursPerActivity: formalInstructionPercentageOfAnnualHoursPerActivity,
      formalInstructionPercentageOfTotalHoursPerActivity: formalInstructionPercentageOfTotalHoursPerActivity
    });
  }
  let fiTotalHoursPerUser = await FormalInstructionMethods.formalInstructionTotalHoursPerUser(
    userId
  );
  let fiPercentageOfWorkFocusPerUser = await FormalInstructionMethods.formalInstructionPercentageOfWorkFocusPerUser(
    userId
  );
  let fiPercentageOfAnnualHoursPerUser = await FormalInstructionMethods.formalInstructionPercentageOfAnnualHoursPerUser(
    userId
  );
  let fiPercentageOfTotalHoursPerUser = await FormalInstructionMethods.formalInstructionPercentageOfTotalHoursPerUser(
    userId
  );

  return {
    formalInstructionWorkloadData: formalInstructionWorkloadData,
    formalInstructionTotalHoursPerUser: fiTotalHoursPerUser,
    formalInstructionPercentageOfWorkFocusPerUser: fiPercentageOfWorkFocusPerUser,
    formalInstructionPercentageOfAnnualHoursPerUser: fiPercentageOfAnnualHoursPerUser,
    formalInstructionPercentageOfTotalHoursPerUser: fiPercentageOfTotalHoursPerUser
  };
};
let personnelDevelopmentWorkloadDataPerUser = async userId => {
  let personnelDevelopmentWorkloadData = [];
  let personnelDevelopmentActivities = await PersonnelDevelopmentActivity.find({
    userId: userId
  });

  for (let personnelDevelopmentActivity of personnelDevelopmentActivities) {
    let activity = personnelDevelopmentActivity;
    let personnelDevelopmentTotalHoursPerActivity = await PersonnelDevelopmentMethods.personnelDevelopmentTotalHoursPerActivity(
      personnelDevelopmentActivity.activityId
    );
    let personnelDevelopmentPercentageOfWorkFocusPerActivity = await PersonnelDevelopmentMethods.personnelDevelopmentPercentageOfWorkFocusPerActivity(
      personnelDevelopmentActivity.activityId
    );
    let personnelDevelopmentPercentageOfAnnualHoursPerActivity = await PersonnelDevelopmentMethods.personnelDevelopmentPercentageOfAnnualHoursPerActivity(
      personnelDevelopmentActivity.activityId
    );
    let personnelDevelopmentPercentageOfTotalHoursPerActivity = await PersonnelDevelopmentMethods.personnelDevelopmentPercentageOfTotalHoursPerActivity(
      personnelDevelopmentActivity.activityId
    );
    personnelDevelopmentWorkloadData.push({
      personnelDevelopmentActivity: activity,
      personnelDevelopmentTotalHoursPerActivity: personnelDevelopmentTotalHoursPerActivity,
      personnelDevelopmentPercentageOfWorkFocusPerActivity: personnelDevelopmentPercentageOfWorkFocusPerActivity,
      personnelDevelopmentPercentageOfAnnualHoursPerActivity: personnelDevelopmentPercentageOfAnnualHoursPerActivity,
      personnelDevelopmentPercentageOfTotalHoursPerActivity: personnelDevelopmentPercentageOfTotalHoursPerActivity
    });
  }
  let pdGlobalTarrif = await PersonnelDevelopmentMethods.personnelDevelopmentGlobalTarrif();
  let pdTotalHoursPerUser = await PersonnelDevelopmentMethods.personnelDevelopmentTotalHoursPerUser(
    userId
  );
  let pdPercentageOfWorkFocusPerUser = await PersonnelDevelopmentMethods.personnelDevelopmentPercentageOfWorkFocusPerUser(
    userId
  );
  let pdPercentageOfAnnualHoursPerUser = await PersonnelDevelopmentMethods.personnelDevelopmentPercentageOfAnnualHoursPerUser(
    userId
  );
  let pdPercentageOfTotalHoursPerUser = await PersonnelDevelopmentMethods.personnelDevelopmentPercentageOfTotalHoursPerUser(
    userId
  );

  return {
    personnelDevelopmentWorkloadData: personnelDevelopmentWorkloadData,
    personnelDevelopmentGlobalTarrif: pdGlobalTarrif,
    personnelDevelopmentTotalHoursPerUser: pdTotalHoursPerUser,
    personnelDevelopmentPercentageOfWorkFocusPerUser: pdPercentageOfWorkFocusPerUser,
    personnelDevelopmentPercentageOfAnnualHoursPerUser: pdPercentageOfAnnualHoursPerUser,
    personnelDevelopmentPercentageOfTotalHoursPerUser: pdPercentageOfTotalHoursPerUser
  };
};
let publicServiceWorkloadDataPerUser = async userId => {
  let publicServiceWorkloadData = [];
  let publicServiceActivities = await PublicServiceActivity.find({
    userId: userId
  });

  for (let publicServiceActivity of publicServiceActivities) {
    let activity = publicServiceActivity;
    let publicServiceTotalHoursPerActivity = await PublicServiceMethods.publicServiceTotalHoursPerActivity(
      publicServiceActivity.activityId
    );
    let publicServicePercentageOfWorkFocusPerActivity = await PublicServiceMethods.publicServicePercentageOfWorkFocusPerActivity(
      publicServiceActivity.activityId
    );
    let publicServicePercentageOfAnnualHoursPerActivity = await PublicServiceMethods.publicServicePercentageOfAnnualHoursPerActivity(
      publicServiceActivity.activityId
    );
    let publicServicePercentageOfTotalHoursPerActivity = await PublicServiceMethods.publicServicePercentageOfTotalHoursPerActivity(
      publicServiceActivity.activityId
    );
    publicServiceWorkloadData.push({
      publicServiceActivity: activity,
      publicServiceTotalHoursPerActivity: publicServiceTotalHoursPerActivity,
      publicServicePercentageOfWorkFocusPerActivity: publicServicePercentageOfWorkFocusPerActivity,
      publicServicePercentageOfAnnualHoursPerActivity: publicServicePercentageOfAnnualHoursPerActivity,
      publicServicePercentageOfTotalHoursPerActivity: publicServicePercentageOfTotalHoursPerActivity
    });
  }
  let psGlobalTarrif = await PublicServiceMethods.publicServiceGlobalTarrif();
  let psTotalHoursPerUser = await PublicServiceMethods.publicServiceTotalHoursPerUser(
    userId
  );
  let psPercentageOfWorkFocusPerUser = await PublicServiceMethods.publicServicePercentageOfWorkFocusPerUser(
    userId
  );
  let psPercentageOfAnnualHoursPerUser = await PublicServiceMethods.publicServicePercentageOfAnnualHoursPerUser(
    userId
  );
  let psPercentageOfTotalHoursPerUser = await PublicServiceMethods.publicServicePercentageOfTotalHoursPerUser(
    userId
  );

  return {
    publicServiceWorkloadData: publicServiceWorkloadData,
    publicServiceGlobalTarrif: psGlobalTarrif,
    publicServiceTotalHoursPerUser: psTotalHoursPerUser,
    publicServicePercentageOfWorkFocusPerUser: psPercentageOfWorkFocusPerUser,
    publicServicePercentageOfAnnualHoursPerUser: psPercentageOfAnnualHoursPerUser,
    publicServicePercentageOfTotalHoursPerUser: psPercentageOfTotalHoursPerUser
  };
};
let researchWorkloadDataPerUser = async userId => {
  let researchWorkloadData = [];
  let researchActivities = await ResearchActivity.find({ userId: userId });

  for (let researchActivity of researchActivities) {
    let activity = researchActivity;
    let researchTotalHoursPerActivity = await ResearchMethods.researchTotalHoursPerActivity(
      researchActivity.activityId
    );
    let researchPercentageOfWorkFocusPerActivity = await ResearchMethods.researchPercentageOfWorkFocusPerActivity(
      researchActivity.activityId
    );
    let researchPercentageOfAnnualHoursPerActivity = await ResearchMethods.researchPercentageOfAnnualHoursPerActivity(
      researchActivity.activityId
    );
    let researchPercentageOfTotalHoursPerActivity = await ResearchMethods.researchPercentageOfTotalHoursPerActivity(
      researchActivity.activityId
    );
    researchWorkloadData.push({
      researchActivity: activity,
      researchTotalHoursPerActivity: researchTotalHoursPerActivity,
      researchPercentageOfWorkFocusPerActivity: researchPercentageOfWorkFocusPerActivity,
      researchPercentageOfAnnualHoursPerActivity: researchPercentageOfAnnualHoursPerActivity,
      researchPercentageOfTotalHoursPerActivity: researchPercentageOfTotalHoursPerActivity
    });
  }
  let rGlobalTarrif = await ResearchMethods.researchGlobalTarrif();
  let rTotalHoursPerUser = await ResearchMethods.researchTotalHoursPerUser(
    userId
  );
  let rPercentageOfWorkFocusPerUser = await ResearchMethods.researchPercentageOfWorkFocusPerUser(
    userId
  );
  let rPercentageOfAnnualHoursPerUser = await ResearchMethods.researchPercentageOfAnnualHoursPerUser(
    userId
  );
  let rPercentageOfTotalHoursPerUser = await ResearchMethods.researchPercentageOfTotalHoursPerUser(
    userId
  );

  return {
    researchWorkloadData: researchWorkloadData,
    researchGlobalTarrif: rGlobalTarrif,
    researchTotalHoursPerUser: rTotalHoursPerUser,
    researchPercentageOfWorkFocusPerUser: rPercentageOfWorkFocusPerUser,
    researchPercentageOfAnnualHoursPerUser: rPercentageOfAnnualHoursPerUser,
    researchPercentageOfTotalHoursPerUser: rPercentageOfTotalHoursPerUser
  };
};
let supervisionWorkloadDataPerUser = async userId => {
  let supervisionWorkloadData = [];
  let supervisionActivities = await SupervisionActivity.find({
    userId: userId
  });

  for (let supervisionActivity of supervisionActivities) {
    let activity = supervisionActivity;
    let supervisionTotalHoursPerActivity = await SupervisionMethods.supervisionTotalHoursPerActivity(
      supervisionActivity.activityId
    );
    let supervisionPercentageOfWorkFocusPerActivity = await SupervisionMethods.supervisionPercentageOfWorkFocusPerActivity(
      supervisionActivity.activityId
    );
    let supervisionPercentageOfAnnualHoursPerActivity = await SupervisionMethods.supervisionPercentageOfAnnualHoursPerActivity(
      supervisionActivity.activityId
    );
    let supervisionPercentageOfTotalHoursPerActivity = await SupervisionMethods.supervisionPercentageOfTotalHoursPerActivity(
      supervisionActivity.activityId
    );
    supervisionWorkloadData.push({
      supervisionActivity: activity,
      supervisionTotalHoursPerActivity: supervisionTotalHoursPerActivity,
      supervisionPercentageOfWorkFocusPerActivity: supervisionPercentageOfWorkFocusPerActivity,
      supervisionPercentageOfAnnualHoursPerActivity: supervisionPercentageOfAnnualHoursPerActivity,
      supervisionPercentageOfTotalHoursPerActivity: supervisionPercentageOfTotalHoursPerActivity
    });
  }
  let svGlobalTarrif = await SupervisionMethods.supervisionGlobalTarrif();
  let svTotalHoursPerUser = await SupervisionMethods.supervisionTotalHoursPerUser(
    userId
  );
  let svPercentageOfWorkFocusPerUser = await SupervisionMethods.supervisionPercentageOfWorkFocusPerUser(
    userId
  );
  let svPercentageOfAnnualHoursPerUser = await SupervisionMethods.supervisionPercentageOfAnnualHoursPerUser(
    userId
  );
  let svPercentageOfTotalHoursPerUser = await SupervisionMethods.supervisionPercentageOfTotalHoursPerUser(
    userId
  );

  return {
    supervisionWorkloadData: supervisionWorkloadData,
    supervisionGlobalTarrif: svGlobalTarrif,
    supervisionTotalHoursPerUser: svTotalHoursPerUser,
    supervisionPercentageOfWorkFocusPerUser: svPercentageOfWorkFocusPerUser,
    supervisionPercentageOfAnnualHoursPerUser: svPercentageOfAnnualHoursPerUser,
    supervisionPercentageOfTotalHoursPerUser: svPercentageOfTotalHoursPerUser
  };
};

// Per Activity
let formalInstructionWorkloadDataPerActivity = async activityId => {
  let activity = await FormalInstructionActivity.find({
    activityId: activityId
  })
    .populate('module')
    .populate('block')
    .populate('offeringType')
    .populate('qualification');
  let formalInstructionStudentsEnrolled = await FormalInstructionMethods.formalInstructionStudentsEnrolled(
    activityId
  );
  let formalInstructionBaseContactHours = await FormalInstructionMethods.formalInstructionBaseContactHours(
    activityId
  );
  let formalInstructionCoordinationHours = await FormalInstructionMethods.formalInstructionCoordinationHours(
    activityId
  );
  let formalInstructionStudentSupportHours = await FormalInstructionMethods.formalInstructionStudentSupportHours(
    activityId
  );
  let formalInstructionPreparationTimeHours = await FormalInstructionMethods.formalInstructionPreparationTimeHours(
    activityId
  );
  let formalInstructionAssessmentSettingHours = await FormalInstructionMethods.formalInstructionAssessmentSettingHours(
    activityId
  );
  let formalInstructionExamMarkingHours = await FormalInstructionMethods.formalInstructionExamMarkingHours(
    activityId
  );
  let formalInstructionCourseworkMarkingHours = await FormalInstructionMethods.formalInstructionCourseworkMarkingHours(
    activityId
  );
  let formalInstructionFeedbackHours = await FormalInstructionMethods.formalInstructionFeedbackHours(
    activityId
  );
  let formalInstructionFormativeAssessmentHours = await FormalInstructionMethods.formalInstructionFormativeAssessmentHours(
    activityId
  );
  let formalInstructionModerationHours = await FormalInstructionMethods.formalInstructionModerationHours(
    activityId
  );
  let formalInstructionOtherHoursPerActivity = await FormalInstructionMethods.formalInstructionOtherHoursPerActivity(
    activityId
  );
  let formalInstructionTotalHoursPerActivity = await FormalInstructionMethods.formalInstructionTotalHoursPerActivity(
    activityId
  );
  let formalInstructionPercentageOfWorkFocusPerActivity = await FormalInstructionMethods.formalInstructionPercentageOfWorkFocusPerActivity(
    activityId
  );
  let formalInstructionPercentageOfAnnualHoursPerActivity = await FormalInstructionMethods.formalInstructionPercentageOfAnnualHoursPerActivity(
    activityId
  );

  return {
    formalInstructionActivity: activity,
    formalInstructionStudentsEnrolled: formalInstructionStudentsEnrolled,
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
    formalInstructionPercentageOfAnnualHoursPerActivity: formalInstructionPercentageOfAnnualHoursPerActivity
  };
};
let academicAdministrationHemis = async userId => {
  let academicAdministrationHemisPerActivity = [];

  let activities = await AcademicAdministrationMethods.academicAdministrationActivitiesByUser(
    userId
  );
  for (let activity of activities) {
    const totalHours = await AcademicAdministrationMethods.academicAdministrationTotalHoursPerActivity(
      activity.activityId
    );
    const percentageOfAnnualHoursPerActivity = await AcademicAdministrationMethods.academicAdministrationPercentageOfAnnualHoursPerActivity(
      activity.activityId
    );
    const percentageOfTotalHoursPerActivity = await AcademicAdministrationMethods.academicAdministrationPercentageOfTotalHoursPerActivity(
      activity.activityId
    );
    academicAdministrationHemisPerActivity.push({
      activity: activity,
      totalHours: totalHours,
      percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
      percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity
    });
  }
  const globalTarrif = await AcademicAdministrationMethods.academicAdministrationGlobalTarrif();
  const totalhoursPerUser = await AcademicAdministrationMethods.academicAdministrationTotalHoursPerUser(
    userId
  );
  const percentageOfAnnualHoursPerUser = await AcademicAdministrationMethods.academicAdministrationPercentageOfAnnualHoursPerUser(
    userId
  );
  const percentageOfTotalHoursPerUser = await AcademicAdministrationMethods.academicAdministrationPercentageOfTotalHoursPerUser(
    userId
  );

  academicAdministrationHemis = {
    hemisPerActivity: academicAdministrationHemisPerActivity,
    globalTarrif: globalTarrif,
    totalhoursPerUser: totalhoursPerUser,
    percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
    percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
  };

  return academicAdministrationHemis;
};
let executiveManagementHemis = async userId => {
  const activities = await ExecutiveManagementMethods.executiveManagementActivitiesByUser(
    userId
  );
  let executiveManagementHemisPerActivity = [];
  for (let activity of activities) {
    const totalHours = await ExecutiveManagementMethods.executiveManagementTotalHoursPerActivity(
      activity.activityId
    );
    const percentageOfAnnualHoursPerActivity = await ExecutiveManagementMethods.executiveManagementPercentageOfAnnualHoursPerActivity(
      activity.activityId
    );
    const percentageOfTotalHoursPerActivity = await ExecutiveManagementMethods.executiveManagementPercentageOfTotalHoursPerActivity(
      activity.activityId
    );
    executiveManagementHemisPerActivity.push({
      activity: activity,
      totalHours: totalHours,
      percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
      percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity
    });
  }
  const globalTarrif = await ExecutiveManagementMethods.executiveManagementGlobalTarrif();
  const totalhoursPerUser = await ExecutiveManagementMethods.executiveManagementTotalHoursPerUser(
    userId
  );
  const percentageOfAnnualHoursPerUser = await ExecutiveManagementMethods.executiveManagementPercentageOfAnnualHoursPerUser(
    userId
  );
  const percentageOfTotalHoursPerUser = await ExecutiveManagementMethods.executiveManagementPercentageOfTotalHoursPerUser(
    userId
  );

  executiveManagementHemis = {
    hemisPerActivity: executiveManagementHemisPerActivity,
    globalTarrif: globalTarrif,
    totalhoursPerUser: totalhoursPerUser,
    percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
    percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
  };
  return executiveManagementHemis;
};
let communityInstructionHemis = async userId => {
  const activities = await CommunityInstructionMethods.communityInstructionActivitiesByUser(
    userId
  );
  let communityInstructionHemisPerActivity = [];
  for (let activity of activities) {
    const totalHours = await CommunityInstructionMethods.communityInstructionTotalHoursPerActivity(
      activity.activityId
    );
    const percentageOfAnnualHoursPerActivity = await CommunityInstructionMethods.communityInstructionPercentageOfAnnualHoursPerActivity(
      activity.activityId
    );
    const percentageOfTotalHoursPerActivity = await CommunityInstructionMethods.communityInstructionPercentageOfTotalHoursPerActivity(
      activity.activityId
    );
    communityInstructionHemisPerActivity.push({
      activity: activity,
      totalHours: totalHours,
      percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
      percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity
    });
  }
  const globalTarrif = await CommunityInstructionMethods.communityInstructionGlobalTarrif();

  const totalhoursPerUser = await CommunityInstructionMethods.communityInstructionTotalHoursPerUser(
    userId
  );
  const percentageOfAnnualHoursPerUser = await CommunityInstructionMethods.communityInstructionPercentageOfAnnualHoursPerUser(
    userId
  );
  const percentageOfTotalHoursPerUser = await CommunityInstructionMethods.communityInstructionPercentageOfTotalHoursPerUser(
    userId
  );

  communityInstructionHemis = {
    hemisPerActivity: communityInstructionHemisPerActivity,
    globalTarrif: globalTarrif,
    totalhoursPerUser: totalhoursPerUser,
    percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
    percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
  };
  return communityInstructionHemis;
};
let formalInstructionHemis = async userId => {
  let activities = await FormalInstructionMethods.formalInstructionActivitiesByUser(
    userId
  );
  let formalInstructionHemisPerActivity = [];
  for (let activity of activities) {
    let baseContactHours = await FormalInstructionMethods.formalInstructionBaseContactHours(
      activity.activityId
    );
    let otherHours = await FormalInstructionMethods.formalInstructionOtherHoursPerActivity(
      activity.activityId
    );
    let totalHours = await FormalInstructionMethods.formalInstructionTotalHoursPerActivity(
      activity.activityId
    );
    let percentageOfAnnualHoursPerActivity = await FormalInstructionMethods.formalInstructionPercentageOfAnnualHoursPerActivity(
      activity.activityId
    );
    let percentageOfTotalHoursPerActivity = await FormalInstructionMethods.formalInstructionPercentageOfTotalHoursPerActivity(
      activity.activityId
    );
    let studentsEnrolled = await FormalInstructionMethods.studentsEnrolled;
    formalInstructionHemisPerActivity.push({
      activity: activity,
      baseContactHours: baseContactHours,
      otherHours: otherHours,
      totalHours: totalHours,
      percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
      percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity,
      studentsEnrolled: studentsEnrolled
    });
  }
  const totalhoursPerUser = await FormalInstructionMethods.formalInstructionTotalHoursPerUser(
    userId
  );
  const percentageOfAnnualHoursPerUser = await FormalInstructionMethods.formalInstructionPercentageOfAnnualHoursPerUser(
    userId
  );
  const percentageOfTotalHoursPerUser = await FormalInstructionMethods.formalInstructionPercentageOfTotalHoursPerUser(
    userId
  );

  formalInstructionHemis = {
    hemisPerActivity: formalInstructionHemisPerActivity,
    totalhoursPerUser: totalhoursPerUser,
    percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
    percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
  };
  return formalInstructionHemis;
};
let personnelDevelopmentHemis = async userId => {
  const activities = await PersonnelDevelopmentMethods.personnelDevelopmentActivitiesByUser(
    userId
  );
  let personnelDevelopmentHemisPerActivity = [];
  for (let activity of activities) {
    const totalHours = await PersonnelDevelopmentMethods.personnelDevelopmentTotalHoursPerActivity(
      activity.activityId
    );
    const percentageOfAnnualHoursPerActivity = await PersonnelDevelopmentMethods.personnelDevelopmentPercentageOfAnnualHoursPerActivity(
      activity.activityId
    );
    const percentageOfTotalHoursPerActivity = await PersonnelDevelopmentMethods.personnelDevelopmentPercentageOfTotalHoursPerActivity(
      activity.activityId
    );
    personnelDevelopmentHemisPerActivity.push({
      activity: activity,
      totalHours: totalHours,
      percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
      percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity
    });
  }
  const globalTarrif = await PersonnelDevelopmentMethods.personnelDevelopmentGlobalTarrif();

  const totalhoursPerUser = await PersonnelDevelopmentMethods.personnelDevelopmentTotalHoursPerUser(
    userId
  );
  const percentageOfAnnualHoursPerUser = await PersonnelDevelopmentMethods.personnelDevelopmentPercentageOfAnnualHoursPerUser(
    userId
  );
  const percentageOfTotalHoursPerUser = await PersonnelDevelopmentMethods.personnelDevelopmentPercentageOfTotalHoursPerUser(
    userId
  );

  personnelDevelopmentHemis = {
    hemisPerActivity: personnelDevelopmentHemisPerActivity,
    globalTarrif: globalTarrif,
    totalhoursPerUser: totalhoursPerUser,
    percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
    percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
  };
  return personnelDevelopmentHemis;
};
let publicServiceHemis = async userId => {
  const activities = await PublicServiceMethods.publicServiceActivitiesByUser(
    userId
  );
  let publicServiceHemisPerActivity = [];
  for (let activity of activities) {
    const totalHours = await PublicServiceMethods.publicServiceTotalHoursPerActivity(
      activity.activityId
    );
    const percentageOfAnnualHoursPerActivity = await PublicServiceMethods.publicServicePercentageOfAnnualHoursPerActivity(
      activity.activityId
    );
    const percentageOfTotalHoursPerActivity = await PublicServiceMethods.publicServicePercentageOfTotalHoursPerActivity(
      activity.activityId
    );
    publicServiceHemisPerActivity.push({
      activity: activity,
      totalHours: totalHours,
      percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
      percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity
    });
  }
  const globalTarrif = await PublicServiceMethods.publicServiceGlobalTarrif();

  const totalhoursPerUser = await PublicServiceMethods.publicServiceTotalHoursPerUser(
    userId
  );
  const percentageOfAnnualHoursPerUser = await PublicServiceMethods.publicServicePercentageOfAnnualHoursPerUser(
    userId
  );
  const percentageOfTotalHoursPerUser = await PublicServiceMethods.publicServicePercentageOfTotalHoursPerUser(
    userId
  );

  publicServiceHemis = {
    hemisPerActivity: publicServiceHemisPerActivity,
    globalTarrif: globalTarrif,
    totalhoursPerUser: totalhoursPerUser,
    percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
    percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
  };
  return publicServiceHemis;
};
let researchHemis = async userId => {
  const activities = await ResearchMethods.researchActivitiesByUser(userId);
  let researchHemisPerActivity = [];
  for (let activity of activities) {
    const totalHours = await ResearchMethods.researchTotalHoursPerActivity(
      activity.activityId
    );
    const percentageOfAnnualHoursPerActivity = await ResearchMethods.researchPercentageOfAnnualHoursPerActivity(
      activity.activityId
    );
    const percentageOfTotalHoursPerActivity = await ResearchMethods.researchPercentageOfTotalHoursPerActivity(
      activity.activityId
    );
    researchHemisPerActivity.push({
      activity: activity,
      totalHours: totalHours,
      percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
      percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity
    });
  }
  const globalTarrif = await ResearchMethods.researchGlobalTarrif();

  const totalhoursPerUser = await ResearchMethods.researchTotalHoursPerUser(
    userId
  );
  const percentageOfAnnualHoursPerUser = await ResearchMethods.researchPercentageOfAnnualHoursPerUser(
    userId
  );
  const percentageOfTotalHoursPerUser = await ResearchMethods.researchPercentageOfTotalHoursPerUser(
    userId
  );

  researchHemis = {
    hemisPerActivity: researchHemisPerActivity,
    globalTarrif: globalTarrif,
    totalhoursPerUser: totalhoursPerUser,
    percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
    percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
  };
  return researchHemis;
};
let supervisionHemis = async userId => {
  const activities = await SupervisionMethods.supervisionActivitiesByUser(
    userId
  );
  let supervisionHemisPerActivity = [];
  for (let activity of activities) {
    const totalHours = await SupervisionMethods.supervisionTotalHoursPerActivity(
      activity.activityId
    );
    const percentageOfAnnualHoursPerActivity = await SupervisionMethods.supervisionPercentageOfAnnualHoursPerActivity(
      activity.activityId
    );
    const percentageOfTotalHoursPerActivity = await SupervisionMethods.supervisionPercentageOfTotalHoursPerActivity(
      activity.activityId
    );
    supervisionHemisPerActivity.push({
      activity: activity,
      totalHours: totalHours,
      percentageOfAnnualHoursPerActivity: percentageOfAnnualHoursPerActivity,
      percentageOfTotalHoursPerActivity: percentageOfTotalHoursPerActivity
    });
  }
  const totalhoursPerUser = await SupervisionMethods.supervisionTotalHoursPerUser(
    userId
  );
  const percentageOfAnnualHoursPerUser = await SupervisionMethods.supervisionPercentageOfAnnualHoursPerUser(
    userId
  );
  const percentageOfTotalHoursPerUser = await SupervisionMethods.supervisionPercentageOfTotalHoursPerUser(
    userId
  );

  supervisionHemis = {
    hemisPerActivity: supervisionHemisPerActivity,
    totalhoursPerUser: totalhoursPerUser,
    percentageOfAnnualHoursPerUser: percentageOfAnnualHoursPerUser,
    percentageOfTotalHoursPerUser: percentageOfTotalHoursPerUser
  };
  return supervisionHemis;
};

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
  academicAdministrationWorkloadDataPerUser,
  communityInstructionWorkloadDataPerUser,
  executiveManagementWorkloadDataPerUser,
  formalInstructionWorkloadDataPerUser,
  personnelDevelopmentWorkloadDataPerUser,
  publicServiceWorkloadDataPerUser,
  researchWorkloadDataPerUser,
  supervisionWorkloadDataPerUser,
  formalInstructionWorkloadDataPerActivity,
  academicAdministrationHemis,
  executiveManagementHemis,
  communityInstructionHemis,
  formalInstructionHemis,
  personnelDevelopmentHemis,
  publicServiceHemis,
  researchHemis,
  supervisionHemis,
  totalHoursPerUser,
  teachingHoursPerUser,
  researchHoursPerUser,
  serviceHoursPerUser,
  workloadSummaries
};
