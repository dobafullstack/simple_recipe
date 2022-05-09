import { Router } from "express";
import RecipeController from "../controllers/recipe.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.get("/", RecipeController.get);

router.post("/", AuthMiddleware.Authentication, RecipeController.create);
router.put(
  "/:recipe_id",
  AuthMiddleware.Authentication,
  RecipeController.update
);
router.delete(
  "/:recipe_id",
  AuthMiddleware.Authentication,
  RecipeController.delete
);

router.get("/:recipe_id", RecipeController.getDetail);

export default router;
