const gql = require('graphql-tag');

module.exports = `
    type ModuleBlock {
        module: String!,
        block: String!,
        description: String!
    }

    type Query {
        moduleBlock(module: String!, block: String!, description: String!): ModuleBlock
        moduleBlocks: [ModuleBlock]
    }

    type Mutation {
        addModuleBlock(
            module: String!,
            block: String!,
            description: String!): ModuleBlock
        editModuleBlock(
            module: String,
            block: String,
            description: String): ModuleBlock
        deleteModuleBlock(
            module: String,
            block: String,
            description: String): ModuleBlock
    }
`;