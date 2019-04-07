const gql = require('apollo-server-express');

module.exports = `
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
