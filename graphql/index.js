const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./types');
const resolvers = require('./resolvers');

const SERVER = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    playground: {
        endpoint: `http://localhost:5000/graphql`,
        setting: {
            'editor.theme': 'light'
        }
    }
});

module.exports = SERVER;