import { ApolloServer } from "apollo-server-express";
import depthLimit from "graphql-depth-limit";

import resolvers from "./resolvers/index";
import typeDefs from "./types/index";

const SERVER = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  engine: {
    apiKey: "service:eworkload:dtlWAaERcWUNWvnT1GKlvA"
  },
  validationRules: [],
  uploads: {
    maxFileSize: 10000000,
    maxFiles: 20
  },
  context: async (req: any) => {},
  tracing: true,
  debug: true,
  playground: {
    endpoint: "localhost:5000/graphql",
    settings: { "editor.theme": "dark" }
  }
});

export default SERVER;
