import gql from 'graphql-tag';

export default gql `
  interface Activity {
    activityId: String!
    userId: String!
    user: User
    dutyId: String!
    duty: Duty
    approvalStatus: Boolean
    createdAt: String
    updatedAt: String
  }

  type CommInstructionActivity implements Activity {
    activityId: String!
    userId: String!
    user: User
    dutyId: String!
    duty: Duty
    approvalStatus: Boolean
    createdAt: String
    updatedAt: String
    commInstructionDescription: String!
    evidenceId: String
    evidence: Evidence
    workload: Int
  other: Int
  }

  input CommInstructionActivityInput {
    userId: String
    dutyId: String
    title: String
    description: String
    evidenceId: String
  }

  type PublicServiceActivity implements Activity {
    activityId: String!
    userId: String!
    user: User
    dutyId: String!
    duty: Duty
    approvalStatus: Boolean
    createdAt: String
    updatedAt: String
    title: String
    description: String
    evidenceId: String
  }

  input PublicServiceActivityInput {
    userId: String
    dutyId: String
    title: String
    description: String
    evidenceId: String
  }

  type FormalInstructionActivity implements Activity {
    activityId: String!
    userId: String!
    user: User
    dutyId: String!
    duty: Duty
    approvalStatus: Boolean
    createdAt: String
    updatedAt: String
    moduleId: String
    module: Module
    blockId: String
    block: Block
    offeringTypeId: String
    offeringType: OfferingType
    qualificationId: String
    qualification: Qualification
    baseContactHours: Int
    coordinationHours: Int
    studentSupportHours: Int
    preparationTimeHours: Int
    assessmentSettingHours: Int
    examMarkingHours: Int
    courseworkMarkingHours: Int
    feedbackHours: Int
    formativeAssessmentHours: Int
    moderationHours: Int
    otherHours: Int
    totalHours: Int
    teachingPercentage: Int
  }

  input FormalInstructionActivityInput {
    userId: String
    dutyId: String
    moduleId: String
    blockId: String
    offeringTypeId: String
    qualificationId: String
  }

  type ResearchActivity implements Activity {
    activityId: String!
    userId: String!
    user: User
    dutyId: String!
    duty: Duty
    approvalStatus: Boolean
    createdAt: String
    updatedAt: String
    researchType: String!
    researchUrl: String!
  }

  input ResearchActivityInput {
      userId: String
      dutyId: String
      researchType: String
      researchTitle: String
      researchDetails: String
  }

  type SupervisionActivity implements Activity {
  activityId: String!
  userId: String!
  user: User
  dutyId: String!
  duty: Duty
  approvalStatus: Boolean
  createdAt: String
  updatedAt: String
  supervisionRole: String!
  studentId: String!
  student: Student
  workload: Int
  other: Int
  }

  input SupervisionActivityInput {
      userId: String
      dutyId: String
      studentId: String
      topic: String
      year: String
  }

  type Query {
    activity(activityId: String!): Activity
    activities: [Activity]
    activitiesByDuty(dutyId: String!): [Activity]
    activitiesByUser(userId: String!): [Activity]
    unapprovedActivities: [Activity]
    approvedActivities: [Activity]
    formalInstructionActivity(activityId: String!): FormalInstructionActivity
    formalInstructionActivities: [FormalInstructionActivity]
    formalInstructionActivitiesByUser(userId: String!): [FormalInstructionActivity]
    researchActivity(activityId: String!): ResearchActivity
    researchActivities: [ResearchActivity]
    researchActivitiesByUser(userId: String!): [ResearchActivity]
    supervisionActivity(activityId: String!): SupervisionActivity
    supervisionActivities: [SupervisionActivity]
  }

  type Mutation {
    addCommInstructionActivity(commInstructionActivity: CommInstructionActivityInput): CommInstructionActivity
    editCommInstructionActivity(commInstructionActivity: CommInstructionActivityInput): CommInstructionActivity
    deleteCommInstructionActivity(commInstructionActivity: CommInstructionActivityInput): CommInstructionActivity

    addPublicServiceActivity(publicServiceActivity: PublicServiceActivityInput): PublicServiceActivity
    editPublicServiceActivity(publicServiceActivity: PublicServiceActivityInput): PublicServiceActivity
    deletePublicServiceActivity(publicServiceActivity: PublicServiceActivityInput): PublicServiceActivity

    addFormalInstructionActivity(formalInstructionActivity: FormalInstructionActivityInput): FormalInstructionActivity
    editFormalInstructionActivity(formalInstructionActivity: FormalInstructionActivityInput): FormalInstructionActivity
    deleteFormalInstructionActivity(formalInstructionActivity: FormalInstructionActivityInput): FormalInstructionActivity

    addResearchActivity(researchActivity: ResearchActivityInput): ResearchActivity
    editResearchActivity(researchActivity: ResearchActivityInput): ResearchActivity
    deleteResearchActivity(researchActivity: ResearchActivityInput): ResearchActivity

    addSupervisionActivity(supervisionActivity: SupervisionActivityInput): SupervisionActivity
    editSupervisionActivity(supervisionActivity: SupervisionActivityInput): SupervisionActivity
    deleteSupervisionActivity(supervisionActivity: SupervisionActivityInput): SupervisionActivity
  }
`;