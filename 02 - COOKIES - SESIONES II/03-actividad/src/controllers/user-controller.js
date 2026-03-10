import { userService } from "../services/user-service.js";

class UserController {
  constructor(service) {
    this.service = service;
  }

  register = async (req, res, next) => {
    try {
      const response = await this.service.register(req.body);
      // res.status(201).json(response);
      res.redirect('/')
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await this.service.login(email, password);
        req.session.user = {
            loggedIn: true,
            email: user.email,
            first_name: user.first_name,
            role: user.role
        }
        // res.json({ message: "Login exitoso" });
        res.redirect('/profile')
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