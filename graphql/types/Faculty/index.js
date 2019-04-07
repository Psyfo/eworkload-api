const gql = require('graphql-tag');

export default `
    type Faculty {
        facultyId: String!,
        name: String!,
    }

    type Query {
        faculty(facultyId: String!): Faculty
        faculties: [Faculty]
    }

    type Mutation {
        addFaculty(facultyId: String!, name: String!): Faculty
        editFaculty(facultyId: String, name: String): Faculty
        deleteFaculty(facultyId: String, name: String): Faculty
    }
`;