import { gql } from 'apollo-server-core';

export default gql`
  type FormalInstructionActivity implements Activity {
    activityId: String!
    userId: String!
    user: User
    dutyId: String!
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
  }

  input FormalInstructionActivityInput {
    userId: String
    dutyId: String
    moduleId: String
    blockId: String
    offeringTypeId: String
    qualificationId: String
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
  }

  input SupervisionActivityInput {
    userId: String
    dutyId: String
    supervisionRole: String
    split: Int
    studentId: String
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
      formalInstructionActivity: FormalInstructionActivityInput
    ): FormalInstructionActivity
    editFormalInstructionActivity(
      formalInstructionActivity: FormalInstructionActivityInput
    ): FormalInstructionActivity
    deleteFormalInstructionActivity(
      formalInstructionActivity: FormalInstructionActivityInput
    ): FormalInstructionActivity

    addSupervisionActivity(
      supervisionActivity: SupervisionActivityInput
    ): SupervisionActivity
    editSupervisionActivity(
      supervisionActivity: SupervisionActivityInput
    ): SupervisionActivity
    deleteSupervisionActivity(
      supervisionActivity: SupervisionActivityInput
    ): SupervisionActivity
  }
`;
