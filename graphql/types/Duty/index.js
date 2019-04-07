const gql = require('graphql-tag')

module.exports = `
    type Duty {
        dutyId: String!,
        name: String!,
        description: String!
    }

    type Query {
        duty(dutyId: String!): Duty
        duties: [Duty]
    }

    type Mutation {
        addDuty(dutyId: String!, name: String!, description: String!): Duty
        editDuty(dutyId: String, name: String, description: String): Duty
        deleteDuty(dutyId: String, name: String, description: String): Duty
    }
`;