import { fileLoader, mergeResolvers } from 'merge-graphql-schemas';
import path from 'path';

const resolversArray = fileLoader(path.join(__dirname, '.'), {
  extensions: ['.ts', '.js'],
  recursive: true
});

export default mergeResolvers(resolversArray);
