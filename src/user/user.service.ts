import User from "./user.schema";
import bcrypt from "bcrypt";
import { MongoServerError } from "mongodb";

export class UserService {
  public async createUser(user: any) {
    try {
      const saltOrRounds = 10;
      user.password = await bcrypt.hash(user.password, saltOrRounds);
      await User.create(user);

      return { message: "User created successfully" };
    } catch (error: any) {
      if (error instanceof MongoServerError && error.code === 11000) {
        throw new Error("Username already exists");
      }
      throw error;
    }
  }

  public async findUserByUsername(username: string) {
    try {
      const user = await User.findOne({ username: username });
      return user;
    } catch (error) {
      throw new Error("Error finding user");
    }
  }
}

export const userService = new UserService();
