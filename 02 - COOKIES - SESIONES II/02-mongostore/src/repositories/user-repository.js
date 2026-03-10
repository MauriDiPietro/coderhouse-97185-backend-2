import { UserModel } from "../models/user-model.js";

class UserRepository {
  constructor(model) {
    this.model = model;
  }

  register = async (body) => {
    try {
      return await this.model.create(body);
    } catch (error) {
      throw new Error(error);
    }
  };

  getUserByEmail = async (email) => {
    try {
      return await this.model.findOne({ email });
    } catch (error) {
      throw new Error(error);
    }
  };
}

export const userRepository = new UserRepository(UserModel);
