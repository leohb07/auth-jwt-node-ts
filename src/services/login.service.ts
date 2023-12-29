import { Request, Response } from "express";
import { TLogin } from "../types/login.type";
import { UserSchema } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class LoginService {
  public async login(request: Request, response: Response) {
    try {
      const { email, password } = request.body as TLogin;

      const isUserExist = await UserSchema.findOne({
        email: email,
      });

      if (!isUserExist) {
        response.status(404).json({
          status: 404,
          success: false,
          message: "User not found",
        });
        return;
      }

      const isPasswordMatched = await bcrypt.compare(
        password,
        isUserExist?.password
      );

      if (!isPasswordMatched) {
        response.status(400).json({
          status: 400,
          success: false,
          message: "Email or password is incorrect",
        });
        return;
      }

      const token = jwt.sign(
        {
          _id: isUserExist?._id,
          email: isUserExist?.email,
        },
        "token-jwt",
        {
          expiresIn: "1d",
        }
      );

      response.status(200).json({
        status: 200,
        success: true,
        message: "Login success",
        token: token,
      });
    } catch (error: any) {
      response.status(500).json({
        status: 500,
        message: error.message.toString(),
      });
    }
  }
}

export default new LoginService();
