import gql from 'graphql-tag';

export default gql`
  type Discipline {
    disciplineId: String
    name: String!
    description: String!
  }

  type Query {
    discipline(disciplineId: String!): Discipline
    disciplines: [Discipline]
  }

  type Mutation {
    addDiscipline(name: String!, description: String!): Discipline
    editDiscipline(
      disciplineId: String
      name: String
      description: String
    ): Discipline
    deleteDiscipline(
      disciplineId: String
      name: String
      description: String
    ): Discipline
  }
`;
