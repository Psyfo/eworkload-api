import { gql } from 'apollo-server-core';

export default gql`
  type File {
    id: ID!
    path: String!
    filename: String!
    mimetype: String!
  }
  type Query {
    files: [File]
  }

  type Mutation {
    singleUpload(file: Upload!): File!
    multipleUpload(files: [Upload!]!): [File!]!
    uploadProfilePicture(file: Upload!, userId: String!): File!
    uploadEvidence(file: Upload!, activityId: String!): File!
    uploadAcademicAdministrationEvidence(
      file: Upload!
      activityId: String!
    ): File!
    uploadResearchEvidence(file: Upload!, activityId: String!): File!
  }
`;
