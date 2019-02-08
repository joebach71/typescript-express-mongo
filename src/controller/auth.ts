import { Request, Response, NextFunction } from 'express';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import { IUser } from '../interface/collector';
import { UserRepository } from '../repository/user';

const SECRET_CODE = process.env.JWT_SECRET_CODE || 'my-secret-code';

const UserRepo = new UserRepository();
export class AuthController {
  constructor() {
  }
  /**
   * Get all
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  public async login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
      if (err || !user) {
          return res.status(400).json({
              message: 'Something is not right',
              user   : user
          });
      }
     req.login(user, {session: false}, (err) => {
         if (err) {
             res.send(err);
         }
         // generate a signed son web token with the contents of user object and return it in the response
         const token = jwt.sign(user, SECRET_CODE);
         return res.json({user, token});
      });
    });
  }
  public async logout(req: Request, res: Response, next: NextFunction) {
    
  }
}
