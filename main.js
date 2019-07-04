import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import mongoose from 'mongoose';
import passport from 'passport';
import SERVER from './graphql/index';
import isAuth from './auth/is-auth';
import nodemailer from 'nodemailer';

const app = express();

// Database config
import { default as dbConfig } from './config/keys';
const db = dbConfig.MongoURI;

// Mongoose config
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('MongoDB connected...');
  })
  .catch(err => {
    console.log(err);
  });
//mongoose.set('debug', true);
mongoose.connection.on('error', error => console.log(error));
mongoose.Promise = global.Promise;

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cors());
// app.use(morgan('combined'));
// app.use(isAuth);

// GraphQL
SERVER.applyMiddleware({
  app: app,
});

// Routes - Plugin jwt strategy as middleware so only verified user can access the route
// app.use('/', require('./routes/index'));
// app.use('/auth', require('./routes/auth'));
// app.use(
//   '/users',
//   passport.authenticate('jwt', {
//     session: false
//   }),
//   require('./routes/users')
// );
// app.use('/upload', require('./routes/upload'));

// Serve and listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => `Server running on port: ${PORT}`);
