import { Request, Response, NextFunction } from 'express';
import * as moment from 'moment';
import { IUser } from '../interface/collector';
import { UserRepository } from '../repository/user';

export default class UserController {
  private repo: UserRepository;
  constructor(repo?: UserRepository) {
    if (repo) {
      this.repo = repo;
    } else {
      this.repo = new UserRepository();
    }
    return this;
  }
  /**
   * Get all
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      // 
      // Get data
      const result = await this.repo.getAll();
      // 
      // Response
      res.status(200).send({
        message: 'it works! We got all users',
        result: result
      });
  } catch (err) {
      // 
      // Error response
      res.status(500).send({
        message: 'Could not get Examples',
        err: err
      });
    }
  }

  /**
   * Create
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  public async create(req: Request, res: Response, next: NextFunction) {
    // 
    // deconstruct
    const { username, email, firstName, lastName } = req.body;
    const params: IUser = {
      username, email, firstName, lastName, createdAt: moment.now()
    };
    // Create mongo document
    const user = await this.repo.create(params);
    console.log(JSON.stringify(user));
    res.status(200).send({
      message: 'Created!',
      model: user
    });
  }
}
