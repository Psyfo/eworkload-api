import { gql } from 'apollo-server-core';

export default gql`
  type AcademicAdministrationWorkloadPerActivity {
    academicAdministrationTotalHoursPerActivity: Int
    academicAdministrationPercentageOfWorkFocusPerActivity: Int
    academicAdministrationPercentageOfAnnualPerActivity: Int
  }
  type AcademicAdministrationWorkloadPerUser {
    academicAdministrationWorkloadData: [AcademicAdministrationWorkloadPerActivity]
    academicAdministrationTotalHoursPerUser: Int
    academicAdministrationPercentageOfWorkFocusPerUser: Int
    academicAdministrationPercentageOfAnnualPerUser: Int
  }

  type CommunityInstructionWorkloadPerActivity {
    communityInstructionTotalHoursPerActivity: Int
    communityInstructionPercentageOfWorkFocusPerActivity: Int
    communityInstructionPercentageOfAnnualPerActivity: Int
  }
  type CommunityInstructionWorkloadPerUser {
    communityInstructionWorkloadData: [CommunityInstructionWorkloadPerActivity]
    communityInstructionTotalHoursPerUser: Int
    communityInstructionPercentageOfWorkFocusPerUser: Int
    communityInstructionPercentageOfAnnualPerUser: Int
  }

  type ExecutiveManagementWorkloadPerActivity {
    executiveManagementTotalHoursPerActivity: Int
    executiveManagementPercentageOfWorkFocusPerActivity: Int
    executiveManagementPercentageOfAnnualPerActivity: Int
  }
  type ExecutiveManagementWorkloadPerUser {
    executiveManagementWorkloadData: [ExecutiveManagementWorkloadPerActivity]
    executiveManagementTotalHoursPerUser: Int
    executiveManagementPercentageOfWorkFocusPerUser: Int
    executiveManagementPercentageOfAnnualPerUser: Int
  }

  type FormalInstructionWorkloadPerActivity {
    formalInstructionBaseContactHours: Int
    formalInstructionCoordinationHours: Int
    formalInstructionStudentSupportHours: Int
    formalInstructionPreparationTimeHours: Int
    formalInstructionAssessmentSettingHours: Int
    formalInstructionExamMarkingHours: Int
    formalInstructionCourseworkMarkingHours: Int
    formalInstructionFeedbackHours: Int
    formalInstructionFormativeAssessmentHours: Int
    formalInstructionModerationHours: Int
    formalInstructionOtherHoursPerActivity: Int
    formalInstructionTotalHoursPerActivity: Int
    formalInstructionPercentageOfWorkFocusPerActivity: Int
    formalInstructionPercentageOfAnnualPerActivity: Int
  }
  type FormalInstructionWorkloadPerUser {
    formalInstructionWorkloadData: [FormalInstructionWorkloadPerActivity]
    formalInstructionTotalHoursPerUser: Int
    formalInstructionPercentageOfWorkFocusPerUser: Int
    formalInstructionPercentageOfAnnualPerUser: Int
  }

  type PersonnelDevelopmentWorkloadPerActivity {
    personnelDevelopmentTotalHoursPerActivity: Int
    personnelDevelopmentPercentageOfWorkFocusPerActivity: Int
    personnelDevelopmentPercentageOfAnnualPerActivity: Int
  }
  type PersonnelDevelopmentWorkloadPerUser {
    personnelDevelopmentWorkloadData: [PersonnelDevelopmentWorkloadPerActivity]
    personnelDevelopmentTotalHoursPerUser: Int
    personnelDevelopmentPercentageOfWorkFocusPerUser: Int
    personnelDevelopmentPercentageOfAnnualPerUser: Int
  }

  type PublicServiceWorkloadPerActivity {
    publicServiceTotalHoursPerActivity: Int
    publicServicePercentageOfWorkFocusPerActivity: Int
    publicServicePercentageOfAnnualPerActivity: Int
  }
  type PublicServiceWorkloadPerUser {
    publicServiceWorkloadData: [PublicServiceWorkloadPerActivity]
    publicServiceTotalHoursPerUser: Int
    publicServicePercentageOfWorkFocusPerUser: Int
    publicServicePercentageOfAnnualPerUser: Int
  }

  type ResearchWorkloadPerActivity {
    researchTotalHoursPerActivity: Int
    researchPercentageOfWorkFocusPerActivity: Int
    researchPercentageOfAnnualPerActivity: Int
  }
  type ResearchWorkloadPerUser {
    researchWorkloadData: [ResearchWorkloadPerActivity]
    researchTotalHoursPerUser: Int
    researchPercentageOfWorkFocusPerUser: Int
    researchPercentageOfAnnualPerUser: Int
  }

  type SupervisionWorkloadPerActivity {
    supervisionTotalHoursPerActivity: Int
    supervisionPercentageOfWorkFocusPerActivity: Int
    supervisionPercentageOfAnnualPerActivity: Int
  }
  type SupervisionWorkloadPerUser {
    supervisionWorkloadData: [SupervisionWorkloadPerActivity]
    supervisionTotalHoursPerUser: Int
    supervisionPercentageOfWorkFocusPerUser: Int
    supervisionPercentageOfAnnualPerUser: Int
  }

  type Query {
    academicAdministrationWorkloadPerUser(
      userId: String
    ): AcademicAdministrationWorkloadPerUser
    communityInstructionWorkloadPerUser(
      userId: String
    ): CommunityInstructionWorkloadPerUser
    executiveManagementWorkloadPerUser(
      userId: String
    ): ExecutiveManagementWorkloadPerUser
    formalInstructionWorkloadPerUser(
      userId: String
    ): FormalInstructionWorkloadPerUser
    personnelDevelopmentWorkloadPerUser(
      userId: String
    ): PersonnelDevelopmentWorkloadPerUser
    publicServiceWorkloadPerUser(userId: String): PublicServiceWorkloadPerUser
    supervisionWorkloadPerUser(userId: String): SupervisionWorkloadPerUser
  }

  #   type Mutation {

  #   }
`;
