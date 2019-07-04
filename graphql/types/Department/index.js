import gql from 'graphql-tag';

export default gql `
  type Department {
    departmentId: String!
    name: String!
    facultyId: String!
    faculty: Faculty
  }

  input DepartmentInput {
    departmentId: String
    name: String
    facultyId: String
  }

  type Query {
    department(departmentId: String!): Department
    departments: [Department]
  }

  type Mutation {
    addDepartment(department: DepartmentInput): Department
    editDepartment(department: DepartmentInput): Department
    deleteDepartment(department: DepartmentInput): Department
  }
`;