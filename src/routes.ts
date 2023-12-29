import express from "express";
import registerController from "./controllers/register.controller";
import loginController from "./controllers/login.controller";
import eventController from "./controllers/event.controller";

const routes = express.Router();

routes.get("/", (request, response) => {
  response.json({
    API: "Welcome to JWT Authentication",
  });
});

routes.use("/signup", registerController.router);
routes.use("/login", loginController.router);

routes.use("/events", eventController.router);

export default routes;
