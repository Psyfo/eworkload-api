import { gql } from 'apollo-server-express';

export default gql`
  type FormalInstructionActivity implements Activity {
    activityId: String
    userId: String
    user: User
    dutyId: String
    duty: Duty
    approvalStatus: String
    groupId: String
    group: Group
    isCoordinator: Boolean
    createdAt: String
    updatedAt: String
  }
  input FormalInstructionActivityInput {
    activityId: String
    userId: String
    dutyId: String
    groupId: String
    isCoordinator: Boolean
  }
  type SupervisionActivity implements Activity {
    activityId: String!
    userId: String!
    user: User
    dutyId: String!
    duty: Duty
    approvalStatus: String
    supervisionRole: String!
    split: Int
    studentId: String!
    student: Student
    year: String
    createdAt: String
    updatedAt: String
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
    formalInstructionActivitiesByUser(userId: String!): [FormalInstructionActivity]

    supervisionActivity(activityId: String!): SupervisionActivity
    supervisionActivities: [SupervisionActivity]
    supervisionActivitiesByUser(userId: String): [SupervisionActivity]
  }
  type Mutation {
    addFormalInstructionActivity(activity: FormalInstructionActivityInput): FormalInstructionActivity
    editFormalInstructionActivity(activity: FormalInstructionActivityInput): FormalInstructionActivity
    deleteFormalInstructionActivity(activity: FormalInstructionActivityInput): FormalInstructionActivity

    addSupervisionActivity(activity: SupervisionActivityInput): SupervisionActivity
    editSupervisionActivity(activity: SupervisionActivityInput): SupervisionActivity
    deleteSupervisionActivity(activity: SupervisionActivityInput): SupervisionActivity
  }
`;
