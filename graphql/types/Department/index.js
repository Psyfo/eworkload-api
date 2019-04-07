const gql = require('graphql-tag');

export default `
    type Department {
        departmentId: String!,
        name: String!,
        facultyId: String!
        faculty: Faculty
    }

    type Query {
        department(departmentId: String!): Department
        departments: [Department]
    }

    type Mutation {
        addDepartment(departmentId: String!, name: String!, facultyId: String!): Department
        editDepartment(departmentId: String, name: String, facultyId: String): Department
        deleteDepartment(departmentId: String, name: String, facultyId: String): Department
    }
`;