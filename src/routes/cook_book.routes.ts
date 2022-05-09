import { Router } from "express";
import CookBookController from "../controllers/cook_book.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.post("/", AuthMiddleware.Authentication, CookBookController.create);
router.get("/", CookBookController.get);
router.get("/:cook_book_id", CookBookController.getDetail);
router.put(
  "/:cook_book_id",
  AuthMiddleware.Authentication,
  CookBookController.update
);
router.delete(
  "/:cook_book_id",
  AuthMiddleware.Authentication,
  CookBookController.delete
);

export default router;
