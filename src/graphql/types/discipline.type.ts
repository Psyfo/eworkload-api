import { gql } from 'apollo-server-express';

export default gql`
  type Discipline {
    disciplineId: String!
    name: String!
    description: String!
  }
  input DisciplineInput {
    disciplineId: String
    name: String
    description: String
  }
  type Query {
    discipline(disciplineId: String!): Discipline
    disciplines: [Discipline]
  }
  type Mutation {
    addDiscipline(discipline: DisciplineInput): Discipline
    editDiscipline(discipline: DisciplineInput): Discipline
    deleteDiscipline(discipline: DisciplineInput): Discipline
  }
`;
