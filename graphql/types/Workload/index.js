import gql from 'graphql-tag';

export default gql`
  type FormalInstructionWorkload {
    totalBaseHours: Int
    totalOtherHours: Int
    totalOverallHours: Int
    percentageOfFocus: Int
    percentageOfTotal: Int
  }

  type Query {
    formalInstructionWorkload(userId: String): FormalInstructionWorkload
  }

  #   type Mutation {

  #   }
`;
