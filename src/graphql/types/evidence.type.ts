import { gql } from 'apollo-server-express';

export default gql`
  type Evidence {
    activityId: String!
    location: String!
  }
`;
