import { Router } from "express";
import { userController } from "../controllers/user-controller.js";
import { passportCall } from "../middlewares/passport/passport-call.js";

const router = Router();

//! | REGISTRARSE CON GOOGLE | -->
router.get(
  "/oauth2/redirect/accounts.google.com",
  passportCall("google", { assignProperty: "user" }),
  userController.infoUser,
);

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("logout ok");
});

export default router;
