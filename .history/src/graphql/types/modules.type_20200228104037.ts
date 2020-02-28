import { gql } from 'apollo-server-express';

export default gql`
  type Module {
    id: String
    moduleId: String
    name: String
    type: String
    assessmentMethod: String
    nqfLevel: String
    credits: Int
    qualificationId: String
    qualification: Qualification
    offeringTypeId: String
    offeringType: OfferingType
    disciplineId: String
    discipline: Discipline
    venueId: String
    venue: Venue
    blockId: String
    block: Block
    stackId: String
    studyPeriod: String
    lecturedBy: String
    studentsEnrolled: Int
    moderation: String
  }

  input ModuleInput {
    id: String
    moduleId: String
    name: String
    type: String
    assessmentMethod: String
    nqfLevel: String
    credits: Int
    qualificationId: String
    offeringTypeId: String
    disciplineId: String
    venueId: String
    blockId: String
    stackId: String
    studyPeriod: String
    lecturedBy: String
    studentsEnrolled: Int
    moderation: String
  }

  type Query {
    module(id: String!): Module
    modules: [Module]
    modulesByDiscipline(disciplineIds: [String!]!): [Module]
    modulesByModerator(moderatorId: String!): [Module]
    modulesByStack(stackId: String!): [Module]
    stackedWith(id: String!, stackId: String): [Module]
    unstackedModules: [Module]
    modulesByDepartment(departmentId: String!): [Module]
  }

  type Mutation {
    addModule(module: ModuleInput!): Module
    addModules(modules: [ModuleInput!]!): [Module]
    editModule(module: ModuleInput!): Module
    deleteModule(module: ModuleInput!): Module
    unassignAllModules: String
    stackModules(ids: [String!]!): [Module]
    addModuleToStack(id: String!, stackId: String): Module
    unstackModule(id: String!): Module
    resetStacks: String!
    resetEnrollments: String!
    defaultGroupsAllModules: String!
  }
`;
