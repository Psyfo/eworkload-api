import dotenv from 'dotenv';
dotenv.config();
const variables = {
  endpoint: process.env.API_URL,
  port: process.env.PORT
};

export default variables;
