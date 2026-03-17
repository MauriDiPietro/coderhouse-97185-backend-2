import { Router } from "express";
import { userController } from "../controllers/user-controller.js";
import { validateLogin } from "../middlewares/validate-login.js";
import { verifyTokenCookies, verifyTokenHeader } from "../middlewares/verify-token.js";

const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
// router.get("/info", verifyTokenHeader, userController.infoUser);
router.get("/info", verifyTokenCookies, userController.infoUser);

export default router;
