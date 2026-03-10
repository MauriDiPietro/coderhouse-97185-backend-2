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
        req.session.info = {
            loggedIn: true,
            email: user.email,
            role: user.role
        }
        res.json({ message: "Login exitoso" });
    } catch (error) {
      next(error);
    }
  };

  infoUser = async (req, res, next) => {
    try {
        res.json({
            session: req.session
        })
    } catch (error) {
      next(error);
    }
  };
}

export const userController = new UserController(userService);