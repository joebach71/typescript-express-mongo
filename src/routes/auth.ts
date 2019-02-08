//routes/auth.js
import { Router } from 'express';
import { AuthController } from '../controller/auth';

export class AuthRouter {
  public router: Router
  private controller: AuthController;
  /*--------  Constructor  --------*/
  constructor() {
    // 
    // Set router
    this.router = Router();
    this.controller = new AuthController();
    this.init();
  }
  /*--------  Methods  --------*/
  /**
   * Init all routes in this router
   */
  init() {
    this.router.post('/', this.controller.login);
  }
}
