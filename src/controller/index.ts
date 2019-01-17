import { NextFunction, Request, Response } from "express";
import { RESPONSE_CODE } from '../interface/collector';

export default class IndexController {
  /*--------  Constructor  --------*/
  constructor() {
    // 
    // Initialize
    this.init();
  }
  /**
   * Get all
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  public sayHello(req: Request, res: Response, next: NextFunction) {
    const name = req.query['name'];
    try {
      res.status(200).send({
        message: `Hello! ${name}!`,
        statusCode: RESPONSE_CODE.SUCCESS 
      });
    } catch (err) {
      // 
      // Error response
      console.error(JSON.stringify(err));
      res.status(500).send({
        message: 'Could not get Examples',
        err: err,
        statusCode: RESPONSE_CODE.FAILED
      });
    }
  }
  /*--------  Methods  --------*/
  /**
   * Init
   */
  private init() {
  }
}
