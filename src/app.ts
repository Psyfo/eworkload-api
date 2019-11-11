console.time('app started');

import 'graphql-import-node';

import compression from 'compression';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';
import { createServer } from 'http';

import { default as dbConfig } from './config/keys';
import SERVER from './graphql/schema';

const app = express();

const db = dbConfig.MongoURI;

// MONGOOSE CONFIG
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB connected...');
  })
  .catch(err => {
    console.log(err);
  });
// mongoose.set('debug', true);
mongoose.connection.on('error', error => console.log(error));
// mongoose.Promise = global.Promise;

// STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// STANDARD MIDDLEWARE
app.use(express.json({ limit: '50mb' }));
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(cors());
// app.use(compression);
// app.use(morgan('combined'));

// GRAPHQL
SERVER.applyMiddleware({
  app: app
});

// SERVE & LISTEN
const httpServer = createServer(app);
const PORT = process.env.PORT || 5000;
httpServer.listen({ port: PORT }, () =>
  console.log(`Server running at: http://localhost:${PORT}/graphql`)
);
