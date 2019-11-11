import { gql } from 'apollo-server-express';

export default gql`
  type Department {
    departmentId: String!
    name: String!
    facultyId: String!
    faculty: Faculty
    hodId: String
    hod: User
  }
  input DepartmentInput {
    departmentId: String
    name: String
    facultyId: String
    hodId: String
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
