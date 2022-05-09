import { Response } from "express";
import Recipe from "../models/recipe.model";
import Request from "../types/request";
import { CreateRecipeInput } from "../types/recipe.type";
import _ from "lodash";

export default class RecipeController {
  public static async get(req: Request, res: Response) {
    try {
      const recipes = await Recipe.find().populate("authorId", "-password");

      res.json(recipes);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  public static async getDetail(req: Request, res: Response) {
    try {
      const recipe = await Recipe.findById(req.params.recipe_id).populate(
        "authorId",
        "-password"
      );

      if (!recipe) {
        return res.json({
          code: 400,
          success: false,
          message: "Can not find recipe",
        });
      }

      res.json(recipe);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  public static async create(req: Request, res: Response) {
    const createInput = req.body as CreateRecipeInput;

    try {
      const newRecipe = await Recipe.create({
        ...createInput,
        authorId: req.userId,
      });

      res.status(201).json({
        code: 201,
        success: true,
        message: "Create Recipe successfully",
        recipe: newRecipe,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
  public static async update(req: Request, res: Response) {
    const {
      params: { recipe_id },
      body,
    } = req;

    try {
      const existingRecipe = await Recipe.findById(recipe_id);

      if (!existingRecipe) {
        return res.json({
          code: 400,
          success: false,
          message: "Can not find recipe",
        });
      }

      const newRecipe = _.extend(existingRecipe, body);

      await existingRecipe.update(newRecipe);

      res.json({
        code: 200,
        success: true,
        message: "Update recipe successfully",
        recipe: newRecipe,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
  public static async delete(req: Request, res: Response) {
    const {
      params: { recipe_id },
    } = req;

    try {
      const existingRecipe = await Recipe.findById(recipe_id);

      if (!existingRecipe) {
        return res.json({
          code: 400,
          success: false,
          message: "Can not find recipe",
        });
      }

      await Recipe.remove(existingRecipe);

      res.json({
        code: 200,
        success: true,
        message: "Delete recipe successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}
