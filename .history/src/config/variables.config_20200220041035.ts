import dotenv from 'dotenv';
dotenv.config();
variables: any = {
  endpoint: process.env.API_URL
};

export default variables;
