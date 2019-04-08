import gql from 'graphql-tag';

export default gql`
  type Module {
    moduleId: String!
    name: String!
    description: String!
    nqfLevel: String!
    qualificationId: String!
    offeringTypeId: String!
    disciplineId: String!
    credits: Int!
    isMajor: Boolean
    type: String!
    baseContact: Int
    basePractical: Int
  }

  type Query {
    module(moduleId: String!): Module
    modules: [Module]
  }

  type Mutation {
    addModule(
      moduleId: String!
      name: String!
      description: String!
      nqfLevel: String!
      qualificationId: String!
      offeringTypeId: String!
      disciplineId: String!
      credits: Int!
      isMajor: Boolean
      type: String!
      baseContact: Int
      basePractical: Int
    ): Module
    editModule(
      moduleId: String
      name: String
      description: String
      nqfLevel: String
      qualificationId: String
      offeringTypeId: String
      disciplineId: String
      credits: Int
      isMajor: Boolean
      type: String
      baseContact: Int
      basePractical: Int
    ): Module
    deleteModule(
      moduleId: String
      name: String
      description: String
      nqfLevel: String
      qualificationId: String
      offeringTypeId: String
      disciplineId: String
      credits: Int
      isMajor: Boolean
      type: String
      baseContact: Int
      basePractical: Int
    ): Module
  }
`;
