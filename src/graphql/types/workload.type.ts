import { gql } from "apollo-server-express";

export default gql`
  type AcademicAdministrationWorkloadPerActivity {
    activity: AcademicAdministrationActivity
    totalHoursPerActivity: Float
    percentageOfWorkFocusPerActivity: Float
    percentageOfAnnualHoursPerActivity: Float
    percentageOfTotalHoursPerActivity: Float
  }
  type AcademicAdministrationWorkload {
    academicAdministrationWorkloads: [AcademicAdministrationWorkloadPerActivity]
    globalTarrif: Float
    totalHoursPerUser: Float
    percentageOfWorkFocusPerUser: Float
    percentageOfAnnualHoursPerUser: Float
    percentageOfTotalHoursPerUser: Float
  }

  type CommunityInstructionWorkloadPerActivity {
    activity: CommunityInstructionActivity
    totalHoursPerActivity: Float
    percentageOfWorkFocusPerActivity: Float
    percentageOfAnnualHoursPerActivity: Float
    percentageOfTotalHoursPerActivity: Float
  }
  type CommunityInstructionWorkload {
    communityInstructionWorkloads: [CommunityInstructionWorkloadPerActivity]
    globalTarrif: Float
    totalHoursPerUser: Float
    percentageOfWorkFocusPerUser: Float
    percentageOfAnnualHoursPerUser: Float
    percentageOfTotalHoursPerUser: Float
  }

  type ExecutiveManagementWorkloadPerActivity {
    activity: ExecutiveManagementActivity
    totalHoursPerActivity: Float
    percentageOfWorkFocusPerActivity: Float
    percentageOfAnnualHoursPerActivity: Float
    percentageOfTotalHoursPerActivity: Float
  }
  type ExecutiveManagementWorkload {
    executiveManagementWorkloads: [ExecutiveManagementWorkloadPerActivity]
    globalTarrif: Float
    totalHoursPerUser: Float
    percentageOfWorkFocusPerUser: Float
    percentageOfAnnualHoursPerUser: Float
    percentageOfTotalHoursPerUser: Float
  }

  type FormalInstructionWorkloadPerActivity {
    activity: FormalInstructionActivity
    module: Module
    block: Block
    offeringType: OfferingType
    qualification: Qualification
    studentsEnrolled: Float
    baseContactHours: Float
    coordinationHours: Float
    studentSupportHours: Float
    preparationTimeHours: Float
    assessmentSettingHours: Float
    examMarkingHours: Float
    courseworkMarkingHours: Float
    feedbackHours: Float
    formativeAssessmentHours: Float
    moderationHours: Float
    otherHoursPerActivity: Float
    totalHoursPerActivity: Float
    percentageOfWorkFocusPerActivity: Float
    percentageOfAnnualHoursPerActivity: Float
    percentageOfTotalHoursPerActivity: Float
  }
  type FormalInstructionWorkload {
    formalInstructionWorkloads: [FormalInstructionWorkloadPerActivity]
    totalHoursPerUser: Float
    percentageOfWorkFocusPerUser: Float
    percentageOfAnnualHoursPerUser: Float
    percentageOfTotalHoursPerUser: Float
  }

  type PersonnelDevelopmentWorkloadPerActivity {
    activity: PersonnelDevelopmentActivity
    totalHoursPerActivity: Float
    percentageOfWorkFocusPerActivity: Float
    percentageOfAnnualHoursPerActivity: Float
    percentageOfTotalHoursPerActivity: Float
  }
  type PersonnelDevelopmentWorkload {
    personnelDevelopmentWorkloads: [PersonnelDevelopmentWorkloadPerActivity]
    globalTarrif: Float
    totalHoursPerUser: Float
    percentageOfWorkFocusPerUser: Float
    percentageOfAnnualHoursPerUser: Float
    percentageOfTotalHoursPerUser: Float
  }

  type PublicServiceWorkloadPerActivity {
    activity: PublicServiceActivity
    totalHoursPerActivity: Float
    percentageOfWorkFocusPerActivity: Float
    percentageOfAnnualHoursPerActivity: Float
    percentageOfTotalHoursPerActivity: Float
  }
  type PublicServiceWorkload {
    publicServiceWorkloads: [PublicServiceWorkloadPerActivity]
    globalTarrif: Float
    totalHoursPerUser: Float
    percentageOfWorkFocusPerUser: Float
    percentageOfAnnualHoursPerUser: Float
    percentageOfTotalHoursPerUser: Float
  }

  type ResearchWorkloadPerActivity {
    activity: ResearchActivity
    totalHoursPerActivity: Float
    percentageOfWorkFocusPerActivity: Float
    percentageOfAnnualHoursPerActivity: Float
    percentageOfTotalHoursPerActivity: Float
  }
  type ResearchWorkload {
    researchWorkloads: [ResearchWorkloadPerActivity]
    globalTarrif: Float
    totalHoursPerUser: Float
    percentageOfWorkFocusPerUser: Float
    percentageOfAnnualHoursPerUser: Float
    percentageOfTotalHoursPerUser: Float
  }

  type SupervisionWorkloadPerActivity {
    activity: SupervisionActivity
    totalHoursPerActivity: Float
    percentageOfWorkFocusPerActivity: Float
    percentageOfAnnualHoursPerActivity: Float
    percentageOfTotalHoursPerActivity: Float
  }
  type SupervisionWorkload {
    supervisionWorkloads: [SupervisionWorkloadPerActivity]
    totalHoursPerUser: Float
    percentageOfWorkFocusPerUser: Float
    percentageOfAnnualHoursPerUser: Float
    percentageOfTotalHoursPerUser: Float
  }

  type TotalWorkload {
    academicAdministrationWorkload: AcademicAdministrationWorkload
    communityInstructionWorkload: CommunityInstructionWorkload
    executiveManagementWorkload: ExecutiveManagementWorkload
    formalInstructionWorkload: FormalInstructionWorkload
    personnelDevelopmentWorkload: PersonnelDevelopmentWorkload
    publicServiceWorkload: PublicServiceWorkload
    researchWorkload: ResearchWorkload
    supervisionWorkload: SupervisionWorkload
  }

  type WorkloadSummary {
    user: User
    teachingHours: Float
    teachingHoursPerUser: Float
    teachingDifference: Float
    researchHours: Float
    researchHoursPerUser: Float
    researchDifference: Float
    serviceHours: Float
    serviceHoursPerUser: Float
    serviceDifference: Float
  }

  type Query {
    # Work focus data
    teachingHours(userId: String): Float
    researchHours(userId: String): Float
    serviceHours(userId: String): Float
    annualHours: Float
    totalHoursPerUser(userId: String!): Float
    teachingHoursPerUser(userId: String!): Float
    researchHoursPerUser(userId: String!): Float
    serviceHoursPerUser(userId: String!): Float
    workloadSummaries: [WorkloadSummary]

    # Workloads
    academicAdministrationWorkload(
      userId: String
    ): AcademicAdministrationWorkload
    communityInstructionWorkload(userId: String): CommunityInstructionWorkload
    executiveManagementWorkload(userId: String): ExecutiveManagementWorkload
    formalInstructionWorkload(userId: String): FormalInstructionWorkload
    personnelDevelopmentWorkload(userId: String): PersonnelDevelopmentWorkload
    publicServiceWorkload(userId: String): PublicServiceWorkload
    researchWorkload(userId: String): ResearchWorkload
    supervisionWorkload(userId: String): SupervisionWorkload
    totalWorkload(userId: String!): TotalWorkload
  }
  type Mutation {
    initializeWorkloads(userId: String!): String
    updateWorkloads(userId: String!): String
    deleteWorkloads(userId: String!): String
  }
`;
