import gql from 'graphql-tag';

export default gql`
    type Qualification {
        qualificationId: String!,
        name: String!,
        type: String,
        saqaId: String,
        departmentId: String,
        department: Department,
        heqsfLevel: String,
        purpose: String,
        exitLevelOutcomes: [String],
        graduateAttributes: [String]
    }

    type Query {
        qualification(qualificationId: String!): Qualification
        qualifications: [Qualification]
    }

    type Mutation {
        addQualification(
            qualificationId: String!,
            name: String!,
            type: String,
            saqaId: String,
            departmentId: String,
            heqsfLevel: String,
            purpose: String,
            exitLevelOutcomes: [String],
            graduateAttributes: [String]): Qualification
        editQualification(
            qualificationId: String,
            name: String,
            type: String,
            saqaId: String,
            departmentId: String,
            heqsfLevel: String,
            purpose: String,
            exitLevelOutcomes: [String],
            graduateAttributes: [String]): Qualification
        deleteQualification(
            qualificationId: String,
            name: String,
            type: String,
            saqaId: String,
            departmentId: String,
            heqsfLevel: String,
            purpose: String,
            exitLevelOutcomes: [String],
            graduateAttributes: [String]): Qualification
    }
`;