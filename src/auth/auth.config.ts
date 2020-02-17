import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from './../models/user.model';

export default class PassportConfig {
  public static async JwtStrategy() {
    let opts: any = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = 'secret';
    opts.issuer = 'eworkload.dut.ac.za';
    opts.audience = 'dut.ac.za';
    passport.use(
      new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({ userId: jwt_payload.sub }, function(err, user) {
          if (err) {
            return done(err, false);
          }
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      })
    );
  }
}
