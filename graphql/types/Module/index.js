import { gql } from 'apollo-server-core';

export default gql`
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
    userId: String
    user: User
    coordinatorId: String
    coordinator: User
    moderatorId: String
    moderator: User
    stackId: String
    studyPeriod: String
    groupSize: Int
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
    userId: String
    coordinatorId: String
    moderatorId: String
    stackId: String
    studyPeriod: String
    groupSize: Int
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
  }
`;
