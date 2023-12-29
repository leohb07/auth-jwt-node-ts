import express from "express";
import registerController from "./controllers/register-controller";

const routes = express.Router();

routes.get("/", (request, response) => {
  response.json({
    API: "Welcome to JWT Authentication",
  });
});

routes.use("/signup", registerController.router);

export default routes;
