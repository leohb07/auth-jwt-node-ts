import { Router } from "express";
import registerService from "../services/register-service";

class RegisterController {
  router = Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.post("", registerService.register);
  }
}

export default new RegisterController();
