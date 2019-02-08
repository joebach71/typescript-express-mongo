// http://www.passportjs.org/packages/passport-jwt/
import * as express from 'express';
import * as passport from 'passport';
import * as util from 'util';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { UserModel } from '../model/user';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret',
  issuer: 'accounts.sphd.io',
  audience: 'sphd.io'
}
passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
  try {
    const user = await UserModel.findOne({ id: jwt_payload.sub});
    if (user)
      return done(null, user);
    else
      return done(null, false);
  } catch (err) {
    return done(err, false);
    // or create sign up for an account
  }
}));
