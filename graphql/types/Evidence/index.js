import { gql } from 'apollo-server-core';

export default gql`
  type Evidence {
    activityId: String!
    location: String!
  }
`;
