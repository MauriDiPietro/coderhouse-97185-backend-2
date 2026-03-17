import { userService } from "../services/user-service.js";

class UserController {
  constructor(service) {
    this.service = service;
  }

  register = async (req, res, next) => {
    try {
      const response = await this.service.register(req.body);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await this.service.login(email, password);
        const accessToken = this.service.generateToken(user);
        /* ---------------------------------- BODY ---------------------------------- */
        // res.json({ message: "Login exitoso", accessToken });
        /* ------------------------------------ - ----------------------------------- */

        /* --------------------------------- COOKIES -------------------------------- */
        res.cookie('accessToken', accessToken, { httpOnly: true }).json({ message: "Login exitoso" });
        /* ------------------------------------ - ----------------------------------- */

        /* --------------------------------- HEADERS -------------------------------- */
        // res.setHeader('Authorization', accessToken).json({ message: "Login exitoso" });
        /* ------------------------------------ - ----------------------------------- */
    } catch (error) {
      next(error);
    }
  };

  infoUser = async (req, res, next) => {
    try {
        res.json({
            user: req.user
        })
    } catch (error) {
      next(error);
    }
  };
}

export const userController = new UserController(userService);