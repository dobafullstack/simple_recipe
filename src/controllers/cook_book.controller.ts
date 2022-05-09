import { Response } from "express";
import CookBook from "../models/cookBook.model";
import { CreateCookBookInput } from "../types/cook_book.type";
import Request from "../types/request";
import _ from "lodash";

export default class CookBookController {
  public static async get(req: Request, res: Response) {
    try {
      const cook_books = await CookBook.find()
        .populate("recipes")
        .populate("userId", "-password");

      res.json(cook_books);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  public static async getDetail(req: Request, res: Response) {
    const { cook_book_id } = req.params;

    try {
      const cook_book = await CookBook.findById(cook_book_id)
        .populate("recipes")
        .populate("userId", "-password");

      if (!cook_book) {
        return res.json({
          code: 400,
          success: false,
          message: "Can not find cook book",
        });
      }

      res.json({
        code: 200,
        success: true,
        message: "Get detail cook book successfully",
        cook_book,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  public static async create(req: Request, res: Response) {
    const { userId, body } = req;

    const createInput = body as CreateCookBookInput;

    try {
      const newCookBook = await CookBook.create({
        ...createInput,
        userId,
      });

      res.json({
        code: 201,
        success: true,
        message: "Create cook book successfully",
        cook_book: newCookBook,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  public static async update(req: Request, res: Response) {
    const {
      params: { cook_book_id },
      body,
    } = req;

    try {
      const cook_book = await CookBook.findById(cook_book_id);

      if (!cook_book) {
        return res.json({
          code: 400,
          success: false,
          message: "Can not find cook book",
        });
      }

      const newCookBook = _.extend(cook_book, body);

      await cook_book.update(newCookBook);

      res.json({
        code: 200,
        success: true,
        message: "Update cook book successfully",
        cook_book: newCookBook,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  public static async delete(req: Request, res: Response) {
    const {
      params: { cook_book_id },
    } = req;

    try {
      const cook_book = await CookBook.findById(cook_book_id);

      if (!cook_book) {
        return res.json({
          code: 400,
          success: false,
          message: "Can not find cook book",
        });
      }

      await CookBook.remove(cook_book);

      res.json({
        code: 200,
        success: true,
        message: "Delete cook book successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}
