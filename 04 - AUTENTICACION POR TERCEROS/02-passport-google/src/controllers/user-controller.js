import { userService } from "../services/user-service.js";

class UserController {
  constructor(service) {
    this.service = service;
  }

  register = async (req, res, next) => {
    try {
      res.status(201).json({
        message: "Usuario registrado exitosamente",
        session: req.session,
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      res.json({ message: "Login exitoso" });
    } catch (error) {
      next(error);
    }
  };

  infoUser = async (req, res, next) => {
    try {
      const user = req.user;
      res.json(user);
    } catch (error) {
      next(error);
    }
  };
}

export const userController = new UserController(userService);
