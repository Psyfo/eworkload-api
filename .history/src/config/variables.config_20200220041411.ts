import dotenv from 'dotenv';
dotenv.config();
export default {
  endpoint: process.env.API_URL,
  port: process.env.PORT
};
