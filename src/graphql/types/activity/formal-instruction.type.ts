import { gql } from 'apollo-server-express';

export default gql`
  type FormalInstructionActivity implements Activity {
    activityId: String
    userId: String
    user: User
    dutyId: String
    duty: Duty
    approvalStatus: String
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
    evidence: String
    isCoordinator: Boolean
  }
  input FormalInstructionActivityInput {
    activityId: String
    userId: String
    dutyId: String
    moduleId: String
    blockId: String
    offeringTypeId: String
    qualificationId: String
    isCoordinator: Boolean
  }
  type SupervisionActivity implements Activity {
    activityId: String!
    userId: String!
    user: User
    dutyId: String!
    duty: Duty
    approvalStatus: String
    createdAt: String
    updatedAt: String
    supervisionRole: String!
    split: Int
    studentId: String!
    student: Student
    year: String
    evidence: String
  }
  input SupervisionActivityInput {
    activityId: String
    userId: String
    dutyId: String
    supervisionRole: String
    split: Int
    studentId: String
    year: String
  }
  type Query {
    formalInstructionActivity(activityId: String!): FormalInstructionActivity
    formalInstructionActivities: [FormalInstructionActivity]
    formalInstructionActivitiesByUser(
      userId: String!
    ): [FormalInstructionActivity]

    supervisionActivity(activityId: String!): SupervisionActivity
    supervisionActivities: [SupervisionActivity]
    supervisionActivitiesByUser(userId: String): [SupervisionActivity]
  }
  type Mutation {
    addFormalInstructionActivity(
      activity: FormalInstructionActivityInput
    ): FormalInstructionActivity
    editFormalInstructionActivity(
      activity: FormalInstructionActivityInput
    ): FormalInstructionActivity
    deleteFormalInstructionActivity(
      activity: FormalInstructionActivityInput
    ): FormalInstructionActivity

    addSupervisionActivity(
      activity: SupervisionActivityInput
    ): SupervisionActivity
    editSupervisionActivity(
      activity: SupervisionActivityInput
    ): SupervisionActivity
    deleteSupervisionActivity(
      activity: SupervisionActivityInput
    ): SupervisionActivity
  }
`;
