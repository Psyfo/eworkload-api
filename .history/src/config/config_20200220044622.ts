import dotenv from 'dotenv';
dotenv.config();
const config = {
  ENDPOINT: process.env.API_URL,
  PORT: process.env.PORT
};
export default config;
