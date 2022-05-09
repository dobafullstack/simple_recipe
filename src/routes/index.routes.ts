import { Router } from "express";

import UserRoute from "./user.routes";
import RecipeRoute from "./recipe.routes";
import CookBookRoute from "./cook_book.routes";

const router = Router();

router.use("/user", UserRoute);
router.use("/recipe", RecipeRoute);
router.use("/cook-book", CookBookRoute);

export default router;
