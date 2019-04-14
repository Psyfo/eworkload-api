import gql from 'graphql-tag';

export default gql`
  type Module {
    moduleId: String!
    name: String!
    type: String!
    assessmentMethod: String!
    nqfLevel: String!
    prerequisites: [String]
    qualificationId: String!
    qualification: Qualification
    offeringTypeId: String!
    offeringType: OfferingType
    disciplineId: String!
    discipline: Discipline
    credits: Int!
  }

  type Query {
    module(moduleId: String!): Module
    modules: [Module]
    modulesByDiscipline(disciplineId: String!): [Module]
    modulesByModuleIds(moduleIds: [String]):[Module]
  }

  type Mutation {
    addModule(
      moduleId: String!
      name: String!
      type: String!
      assessmentMethod: String!
      nqfLevel: String!
      prerequisites: [String]
      qualificationId: String!
      offeringTypeId: String!
      disciplineId: String!
      credits: Int!
    ): Module
    editModule(
      moduleId: String!
      name: String
      type: String
      assessmentMethod: String
      nqfLevel: String
      prerequisites: [String]
      qualificationId: String
      offeringTypeId: String
      disciplineId: String
      credits: Int
    ): Module
    deleteModule(
      moduleId: String!
      name: String
      type: String
      assessmentMethod: String
      nqfLevel: String
      prerequisites: [String]
      qualificationId: String
      offeringTypeId: String
      disciplineId: String
      credits: Int
    ): Module
  }
`;
