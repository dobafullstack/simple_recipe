import { Router } from "express";
import UserController from "../controllers/user.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.get("/", AuthMiddleware.Authentication, UserController.getUser);
router.post("/register", UserController.register);
router.post("/login", UserController.login);

export default router;
