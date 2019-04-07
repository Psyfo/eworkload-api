const gql = require('graphql-tag');

module.exports = `
    type LectureStack {
        lectureStackId: String!,
        disciplineId: String!,
        discipline: Discipline,
        modules: [String],
        groups: String
    }

    type Query {
        lectureStack(lectureStackId: String!): LectureStack
        lectureStacks: [LectureStack]
    }

    type Mutation {
        addLectureStack(lectureStackId: String!,
            disciplineId: String!,
            modules: [String],
            groups: String): LectureStack
        editLectureStack(lectureStackId: String!,
            disciplineId: String!,
            modules: [String],
            groups: String): LectureStack
        deleteLectureStack(lectureStackId: String!,
            disciplineId: String!,
            modules: [String],
            groups: String): LectureStack
    }
`;