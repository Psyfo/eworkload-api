const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user');


// Local Strategy middleware
passport.use(new LocalStrategy({
        usernameField: 'userId',
        passwordField: 'password'
    },
    (userId, password, done) => {
        return User.findOne({
                userId: userId
            })
            .exec()
            .then(user => {
                // Bad username
                if (!user) {
                    return done(null, false, {
                        message: 'Incorrect username'
                    });
                }
                // Bad password
                if (!user.isValidPassword(password)) {
                    return done(null, false, {
                        message: 'Incorrect password'
                    });
                }
                // Success
                return done(null, user, {
                    message: 'Logged in Successfully'
                });
            })
            .catch(err => done(err));
    }));

// JWT Strategy middleware. Only allows requests with valid tokens to access routes that require authentication
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
}

passport.use(new JwtStrategy(
    options,
    async (jwt_payload, done) => {
        User.findOne(jwt_payload.id, (err, res) => console.log(err))
            .then(user => {
                return done(null, user);
            })
            .catch(err => {
                return done(err, false);
            });
    }
));