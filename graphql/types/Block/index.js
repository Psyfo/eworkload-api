import { gql } from 'apollo-server-express';

export default `
  type Block {
    blockId: String!
    name: String!
    description: String!
  }

  type Query {
    block(blockId: String!): Block
    blocks: [Block]
  }

  type Mutation {
    addBlock(blockId: String!, name: String!, description: String!): Block
    editBlock(blockId: String, name: String, description: String): Block
    deleteBlock(blockId: String, name: String, description: String): Block
  }
`;
