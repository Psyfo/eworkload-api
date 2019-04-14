import gql from 'graphql-tag';

export default gql`
  type LectureStack {
    lectureStackId: String!
    disciplineId: String!
    discipline: Discipline
    moduleIds: [String]
    modules: [Module]
    groups: Int
    userIds: [String]
    users: [User]
  }

  type Query {
    lectureStack(lectureStackId: String!): LectureStack
    lectureStacks: [LectureStack]
  }

  type Mutation {
    addLectureStack(
      disciplineId: String!
      moduleIds: [String]
      groups: Int,
      userIds: [String]
    ): LectureStack
    editLectureStack(
      lectureStackId: String
      disciplineId: String
      moduleIds: [String]
      userIds: [String]
      groups: Int
    ): LectureStack
    deleteLectureStack(
      lectureStackId: String
      disciplineId: String
      moduleIds: [String]
      userIds: [String]
      groups: Int
    ): LectureStack
  }
`;
