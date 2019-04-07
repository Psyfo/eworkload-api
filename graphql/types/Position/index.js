const gql = require('graphql-tag');

module.exports = `
    type Position {
        positionId: String!,
        name: String!,
        description: String!
    }

    type Query {
        position(positionId: String!): Position
        positions: [Position]
    }

    type Mutation {
        addPosition(name: String!, description: String!): Position
        editPosition(positionId: String, name: String, description: String): Position
        deletePosition(positionId: String, name: String, description: String): Position
    }
`;