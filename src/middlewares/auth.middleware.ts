import { NextFunction, Response } from "express";
import Request from "../types/request";
import jwt from "jsonwebtoken";

export default class AuthMiddleware {
  public static async Authentication(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const bearerToken = req.headers.authorization;

      if (!bearerToken) {
        return res.status(401).json({
          message: "You have to login first",
        });
      }

      const token = bearerToken.split(" ")[1];

      jwt.verify(token, process.env.JWT_SECRET as string, (err, decode) => {
        if (err) {
          return res.status(401).json({
            message: err.message,
          });
        } else {
          req.userId = (decode as any)._id;

          return next();
        }
      });
    } catch (error: any) {
      return res.status(401).json({
        message: error.message,
      });
    }
  }
}
