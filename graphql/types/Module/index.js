import { gql } from 'apollo-server-core';

export default gql`
  type ModuleGroup {
    groupCode: String
    enrolled: Int
    lecturerIds: [String]
    lecturers: [User]
    repeat: Int
  }

  input ModuleGroupInput {
    groupCode: String
    enrolled: Int
    lecturerIds: [String]
    repeat: Int
  }

  type Module {
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
    groups: [ModuleGroup]
    lecturedBy: String
    enrolled: Int
    moderation: String
  }

  input ModuleInput {
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
    coordinatorId: String
    moderatorId: String
    stackId: String
    studyPeriod: String
    groups: [ModuleGroupInput]
    lecturedBy: String
    moderation: String
  }

  type Query {
    module(
      moduleId: String!
      blockId: String!
      offeringTypeId: String!
      qualificationId: String!
    ): Module
    modules: [Module]
    modulesByDiscipline(disciplineIds: [String!]): [Module]
    modulesByUnassigned: [Module]
    modulesByAssigned: [Module]
    modulesByUnassignedAndDiscipline(disciplineIds: [String]): [Module]
    modulesByUser(userId: String): [Module]
    modulesByModerator(moderatorId: String): [Module]
    modulesByCoordinator(coordinatorId: String): [Module]
    modulesByStack(stackId: String): [Module]
  }

  type Mutation {
    addModule(module: ModuleInput): Module
    addModules(modules: [ModuleInput]): [Module]
    editModule(module: ModuleInput): Module
    deleteModule(module: ModuleInput): Module
    assignUserToModule(
      moduleId: String
      blockId: String
      offeringTypeId: String
      qualificationId: String
      userId: String
    ): Module
    unassignUserFromModule(
      moduleId: String
      blockId: String
      offeringTypeId: String
      qualificationId: String
    ): Module
    assignCoordinatorToModule(
      moduleId: String
      blockId: String
      offeringTypeId: String
      qualificationId: String
      userId: String
    ): Module
    unassignCoordinatorFromModule(
      moduleId: String
      blockId: String
      offeringTypeId: String
      qualificationId: String
    ): Module
    assignModeratorToModule(
      moduleId: String
      blockId: String
      offeringTypeId: String
      qualificationId: String
      userId: String
    ): Module
    unassignModeratorFromModule(
      moduleId: String
      blockId: String
      offeringTypeId: String
      qualificationId: String
    ): Module
    unassignAllModules: String
    stackModules(modules: ModuleInput): [Module]
  }
`;
