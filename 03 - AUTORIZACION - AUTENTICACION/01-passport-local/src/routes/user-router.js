import { Router } from "express";
import { userController } from "../controllers/user-controller.js";
import { validateLogin } from "../middlewares/validate-login.js";
import passport from "passport";

const router = Router();

router.post("/register", passport.authenticate('register'), userController.register);
router.post("/login", passport.authenticate('login'), userController.login);
router.get("/info", validateLogin, userController.infoUser);

export default router;
