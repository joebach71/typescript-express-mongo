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
    this.router.get('/:email', this.controller.get);
    this.router.put('/:email', this.controller.update);
    this.router.delete('/:email', this.controller.delete);
    /* profile routes */
    this.router.get('/profile/:email', this.controller.get);
  }
}
// 
// Create Router and export its configured Express.Router
// export default new UserRouter().router;