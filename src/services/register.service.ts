import { Request, Response } from "express";
import { TRegister } from "../types/register.type";
import { UserSchema } from "../models/user.model";
import bcrypt from "bcrypt";

class RegisterService {
  public async register(request: Request, response: Response) {
    try {
      const { name, email, password } = request.body as TRegister;

      const isEmailAllReadyExist = await UserSchema.findOne({
        email: email,
      });

      if (isEmailAllReadyExist) {
        response.status(400).json({
          status: 400,
          message: "Email all ready in use",
        });
        return;
      }

      if (name !== "" && email !== "" && password !== "") {
        const hashedPassword = await bcrypt.hash(password, 10);

        await UserSchema.create({
          name,
          email,
          password: hashedPassword,
        });

        response.status(200).json({
          status: 201,
          success: true,
          message: "user created Successfuly",
        });
      }
    } catch (error: any) {
      console.log(error);

      response.status(500).json({
        status: 500,
        message: error.message.toString(),
      });
    }
  }
}

export default new RegisterService();
