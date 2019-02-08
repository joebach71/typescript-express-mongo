import { Request, Response, NextFunction } from 'express';
import * as moment from 'moment';
import { IUser } from '../interface/collector';
import { UserRepository } from '../repository/user';

const UserRepo = new UserRepository();
export class UserController {
  constructor() {
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
      const result = await UserRepo.getAll();
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
        err
      });
    }
    res.end();
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
    const { email, firstName, lastName, password } = req.body;
    const params: IUser = { email, firstName, lastName, password };
    try {
      // Create mongo document
      const user = await UserRepo.create(params);
      if (!user) {
        return res.status(500).send({
          message: 'Failed to create!'
        });
      }
      res.status(200).send({
        message: 'Created!',
        model: user
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        message: 'Did not create User Document',
        err
      })
    }
  }
  /**
   * Update
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  public async update(req: Request, res: Response, next: NextFunction) {
    // 
    // deconstruct
    const email = req.params['email'];
    const { firstName, lastName, password } = req.body;
    const params: IUser = { email, firstName, lastName, password };
    try {
      // Create mongo document
      const user = await UserRepo.update(params);
      if (!user) {
        return res.status(200).send({
          message: 'Not Found!'
        })
      }
      res.status(200).send({
        message: 'Updated!',
        model: user
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        message: 'Did not update User Document',
        err
      })
    }
  }
  /**
   * Get
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  public async get(req: Request, res: Response, next: NextFunction) {
    // 
    // deconstruct
    const email = req.params['email'];
    try {
      // Create mongo document
      const user = await UserRepo.get(email);
      if (!user) {
        return res.status(200).send({
          message: 'Not Found!',
        })
      }
      res.status(200).send({
        message: 'got the user!',
        model: user
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        message: 'Did not find the User Document',
        err
      })
    }
  }
  /**
   * Delete
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  public async delete(req: Request, res: Response, next: NextFunction) {
    // 
    // deconstruct
    const email = req.params['email'];
    try {
      // Create mongo document
      const user = await UserRepo.delete(email);
      res.status(200).send({
        message: 'Deleted!',
        model: user
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        message: 'Did not delete User Document',
        err
      })
    }
  }
}
