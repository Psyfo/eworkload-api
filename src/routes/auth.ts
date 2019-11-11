import * as express from 'express';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';

const User = require('../models/user');

const router = express.Router();

// Signup
router.post('/signup', async (req, res, next) => {
  // Save user to db
  const user = req.body;
  User.create(user)
    .then(() => {
      res.json({
        message: 'Signup successful',
        user: user
      });
    })
    .catch((err: any) =>
      res.json({
        err
      })
    );
});

// Login
router.post('/login', async (req, res, next) => {
  const user = req.body;
  console.log(user);

  passport.authenticate(
    'local',
    {
      session: false
    },
    async (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: 'Something went wrong',
          info: info,
          err: err,
          user: user
        });
        return user;
      }

      req.login(
        user,
        {
          session: false
        },
        err => {
          if (err) {
            res.json({
              err: err
            });
          }

          // Generate a signed json web token with the contens of the user object and return it in the response

          const token = jwt.sign(user.toJSON(), 'secret');
          return res.json({
            message: 'Login successful',
            user,
            token
          });
        }
      );
    }
  )(req, res);
});

export default router;
