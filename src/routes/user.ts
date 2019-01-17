import { Router } from "express";
import { UserController } from "../controller/user";
import { IUser } from '../interface/collector';

export class UserRouter {
  public router: Router
  private controller: UserController;
  /*--------  Constructor  --------*/
  constructor() {
    // 
    // Set router
    this.router = Router();
    this.controller = new UserController();
    this.init();
  }
  /*--------  Methods  --------*/
  /**
   * Init all routes in this router
   */
  init() {
    this.router.get('/', this.controller.getAll);
    this.router.post('/', this.controller.create);
    this.router.get('/:username', this.controller.get);
    this.router.put('/:username', this.controller.update);
    this.router.delete('/:username', this.controller.delete);
  }
}
// 
// Create Router and export its configured Express.Router
// export default new UserRouter().router;