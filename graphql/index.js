import { ApolloServer } from 'apollo-server-express';

import typeDefs from './types';
import resolvers from './resolvers';

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

export default SERVER;