import path from 'path';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';

const typesArray = fileLoader(path.join(__dirname, '.'), {
  extensions: ['ts', 'js'],
  recursive: true
});

export default mergeTypes(typesArray, {
  all: true
});
