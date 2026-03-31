import { Router } from "express";
import { userController } from "../controllers/user-controller.js";
import { passportCall } from "../middlewares/passport/passport-call.js";

const router = Router();

//! | REGISTRARSE CON GITHUB | --> 
router.get("/register", passportCall('github', { scope: ['user: email'] }));

router.get("/profile", passportCall('github', { scope: ['user: email'] }), userController.infoUser);

router.get('/logout', (req, res)=>{
    req.session.destroy()
    res.send('logout ok')
})

export default router;
