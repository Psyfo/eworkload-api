import dotenv from 'dotenv';
dotenv.config();
const config = {
  endpoint: process.env.API_URL,
  port: process.env.PORT
};
export default config;
