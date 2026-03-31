import { userRepository } from "../repositories/user-repository.js";
import { comparePassword, hashPassword } from "../utils/user-utils.js";

class UserService {
  constructor(repository) {
    this.repository = repository;
  }

  register = async (body) => {
    try {
      const { email, password } = body;
      const existUser = await this.repository.getUserByEmail(email);
      if(existUser) throw new Error("User already exist");
      return await this.repository.register({
        ...body,
        password: hashPassword(password)
      })
    } catch (error) {
      throw error;
    }
  };

  login = async (email, password) => {
    try {
        const existUser = await this.repository.getUserByEmail(email);
        if(!existUser) throw new Error("Credenciales incorrectas");
        const isValidPass = comparePassword(password, existUser.password);
        if(!isValidPass) throw new Error("Credenciales incorrectas");
        return existUser;
    } catch (error) {
      throw error;
    }
  };

  getById = async (id) => {
    try {
      return await this.repository.getById(id);
    } catch (error) {
      throw error;
    }
  };

  getByEmail = async (email) => {
    try {
      return await this.repository.getUserByEmail(email);
    } catch (error) {
      throw error;
    } 
  }
}

export const userService = new UserService(userRepository);
