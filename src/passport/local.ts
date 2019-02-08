/* http://www.passportjs.org/packages/passport-local/ */

import * as passport from 'passport';
import { Strategy } from 'passport-local';
const LocalStrategy = require('passport-local').LocalStrategy;
import { IUser } from '../interface/collector';
import { UserModel } from '../model/user';
import { UserRepository } from '../repository/user';

const repo = new UserRepository();
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password' },
  async function (email: string, password: string) {
    // this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
    const user = await repo.get(email);
    if (!user) {
      throw new Error(`Not Found:${email}`);
    }
    return user;
}));