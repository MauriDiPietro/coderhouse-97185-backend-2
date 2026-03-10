import { Router } from "express";
import { userController } from "../controllers/user-controller.js";
import { validateLogin } from "../middlewares/validate-login.js";

const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/info", validateLogin, userController.infoUser);

export default router;
