import { gql } from 'apollo-server-express';

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
  type Location {
    location: String
  }
  type Mutation {
    singleUpload(file: Upload!): File!
    multipleUpload(files: [Upload!]!): [File!]!
    uploadProfilePicture(file: Upload!, userId: String!): Location
    uploadAcademicAdministrationEvidenceAWS(
      file: Upload!
      userId: String!
      activityId: String!
    ): Location
    uploadResearchEvidenceAWS(
      file: Upload!
      userId: String!
      activityId: String!
    ): Location
  }
`;
