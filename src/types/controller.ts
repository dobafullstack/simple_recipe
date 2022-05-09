import { Response } from "express";
import Request from "./request";

interface Controller {
  get: (req: Request, res: Response) => Promise<void>;
  getDetail: (req: Request, res: Response) => Promise<void>;
  create: (req: Request, res: Response) => Promise<void>;
  update: (req: Request, res: Response) => Promise<void>;
  delete: (req: Request, res: Response) => Promise<void>;
}

export default Controller;
