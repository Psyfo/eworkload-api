import { ApolloServer } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

import getUser from '../auth/is-auth';
import resolvers from './resolvers';
import typeDefs from './types';

const SERVER = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  context: ({ req }) => {
    // get the user token from the headers
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ');
      if (token.length == 2 && token[0].toLowerCase() == 'bearer') {
        jwt.verify(token[1], 'secret', (err, decodedToken) => {
          if (err) {
            // throw new AuthorizationError('Invalid token');
          }
          req.decodedToken = decodedToken;
          // try to retrieve a user with the token
          const user = getUser(decodedToken.userId);

          // optionally block the user
          // we could also check user roles/permissions here
          //if (!user) throw new AuthorizationError('you must be logged in');

          // add the user to the context
          return { user };
        });
      }
    }
  },
  uploads: true,
  playground: {
    endpoint: 'http://localhost:5000/graphql',
    setting: {
      'editor.theme': 'light'
    }
  }
});

export default SERVER;
