import { ApolloServer } from 'apollo-server-express';
import { logger } from './../config/logger';
import resolvers from './resolvers/index';
import typeDefs from './types/index';

const SERVER = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  formatResponse: (response: any) => {
    // logger.info(JSON.stringify(response));
    // return response;
  },
  formatError: error => {
    logger.error(error);

    return error;
  },
  engine: false,
  validationRules: [],
  uploads: {
    maxFileSize: 10000000,
    maxFiles: 20
  },
  context: async (req: any) => {},
  tracing: false,
  debug: true,
  playground: {
    endpoint: 'localhost:5000/graphql',
    settings: { 'editor.theme': 'dark' }
  }
});

export default SERVER;
