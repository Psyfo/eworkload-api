import { gql } from 'apollo-server-core';

export default gql`
  type Block {
    blockId: String!
    name: String!
    description: String!
  }

  input BlockInput {
    blockId: String
    name: String
    description: String
  }

  type Query {
    block(blockId: String!): Block
    blocks: [Block]
  }

  type Mutation {
    addBlock(block: BlockInput): Block
    editBlock(block: BlockInput): Block
    deleteBlock(block: BlockInput): Block
  }
`;
