import { Router } from "express";
import UserController from "../controller/user";
import { IUser } from '../interface/collector';

export class UserRouter {

  public router: Router
  private controller: UserController;
  /*--------  Constructor  --------*/
  constructor(controller?: UserController) {
    // 
    // Set router
    this.router = Router();
    if (!controller) {
      controller = new UserController();
    }
    this.controller = controller;
    this.init();
  }
  /*--------  Methods  --------*/
  /**
   * Init all routes in this router
   */
  init(controller?: UserController) {
    this.router.get('/', this.controller.getAll);
    this.router.post('/', this.controller.create);
  }
}

// 
// Create Router and export its configured Express.Router
const userRoutes = new UserRouter();

export default new UserRouter().router;