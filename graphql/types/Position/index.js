import gql from 'graphql-tag';

export default gql `
    type Position {
        positionId: String!,
        name: String!,
        description: String!
    }

    input PositionInput {
        positionId: String,
        name: String,
        description: String
    }

    type Query {
        position(positionId: String!): Position
        positions: [Position]
    }

    type Mutation {
        addPosition(position: PositionInput): Position
        editPosition(position: PositionInput): Position
        deletePosition(position: PositionInput): Position
    }
`;