import compression from 'compression';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import mongoose from 'mongoose';
import path from 'path';

import { default as dbConfig } from './config/keys.config';
import { logger } from './config/logger';
import SERVER from './graphql/apollo.server';
import passport from 'passport';
import AuthController from './auth/auth.controller';
import { json } from 'body-parser';

import config from './config/config';

// CONFIG VARIABLES
const app = express();
const db = dbConfig.MongoURI;
const PORT = config.PORT || 80;

// MONGOOSE CONFIG
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    logger.info('MongoDB connected...');
  })
  .catch(err => {
    logger.error(err);
  });
mongoose.set('debug', false);
mongoose.connection.on('error', error => logger.error(error));

// MIDDLEWARE (BE AWARE THAT ORDER MAY BE RELEVANT)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '50mb' }));
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(cors());
app.use(compression());

app.get('/test', async (req, res) => {
  res.json({
    response: 'response'
  });
});

// GRAPHQL SERVER
SERVER.applyMiddleware({
  app: app
});

// SERVE & LISTEN
const httpServer = createServer(app);
httpServer.listen({ port: PORT }, () =>
  logger.info(`Server running at: http://localhost:${PORT}/graphql and the URL is ${config.ENDPOINT}`)
);
