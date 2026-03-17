import config from "../config/index.js";
import { userRepository } from "../repositories/user-repository.js";
import { comparePassword, hashPassword } from "../utils/user-utils.js";
import jwt from "jsonwebtoken";

class UserService {
  constructor(repository) {
    this.repository = repository;
  }

  register = async (body) => {
    try {
      const { email, password } = body;
      const existUser = await this.repository.getUserByEmail(email);
      if (existUser) throw new Error("User already exist");
      return await this.repository.register({
        ...body,
        password: hashPassword(password),
      });
    } catch (error) {
      throw error;
    }
  };

  login = async (email, password) => {
    try {
      const existUser = await this.repository.getUserByEmail(email);
      if (!existUser) throw new Error("Credenciales incorrectas");
      const isValidPass = comparePassword(password, existUser.password);
      if (!isValidPass) throw new Error("Credenciales incorrectas");
      return existUser;
    } catch (error) {
      throw error;
    }
  };

  generateToken = (user) => {
    const payload = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
    };
    return jwt.sign(payload, config.SECRET_KEY, { expiresIn: "10m" });
  };
}

export const userService = new UserService(userRepository);
