import { Router } from "express";
import loginService from "../services/login.service";

class LoginController {
  router = Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.post("", loginService.login);
  }
}

export default new LoginController();
