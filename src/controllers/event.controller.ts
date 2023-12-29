import { Router } from "express";
import loginService from "../services/login.service";
import eventService from "../services/event.service";

class EventController {
  router = Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.post("", eventService.create);
  }
}

export default new EventController();
