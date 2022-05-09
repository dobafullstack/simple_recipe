import argon2 from "argon2";
import { Response } from "express";
import User, { IUser } from "../models/user.model";
import { LoginInput, RegisterInput } from "../types/user.type";
import jwt from "jsonwebtoken";
import Request from "../types/request";

const { JWT_SECRET } = process.env;

export default class UserController {
  public static async register(req: Request, res: Response) {
    const registerInput = req.body as RegisterInput;
    try {
      const existingUser = await User.findOne({
        username: registerInput.username,
      });

      if (existingUser) {
        return res.json({
          code: 400,
          success: false,
          message: "Account already exist",
        });
      }

      const password = await argon2.hash(registerInput.password);

      const newUser = await User.create({
        ...registerInput,
        password,
      });

      res.json({
        code: 201,
        success: true,
        message: "Register successfully",
        user: newUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  public static async login(req: Request, res: Response) {
    const loginInput = req.body as LoginInput;

    try {
      const existingUser = await User.findOne({
        username: loginInput.username,
      });

      if (
        !existingUser ||
        !(await argon2.verify(existingUser?.password, loginInput.password))
      ) {
        return res.json({
          code: 400,
          success: false,
          message: "Invalid username or password",
        });
      }

      const token = jwt.sign(
        {
          _id: existingUser._id,
        },
        JWT_SECRET as string
      );

      res.json({
        code: 200,
        success: true,
        message: "Login Successfully",
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  public static async getUser(req: Request, res: Response) {
    try {
      const user = await User.findById(req.userId).select("-password");

      if (!user) {
        return res.json({
          code: 400,
          success: false,
          message: "Can not find user",
        });
      }

      res.json({
        code: 200,
        success: true,
        message: "Get User successfully",
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}
