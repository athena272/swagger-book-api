import jwt from "jsonwebtoken";
import { userService } from "../user/user.service";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
console.log("🚀 ~ JWT_SECRET:", JWT_SECRET)

export class AuthService {
  async login(username: string, password: string) {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }

    try {
      const user = await userService.findUserByUsername(username);

      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Invalid username or password");
      }

      const token = jwt.sign(
        { id: user._id, username: user.username },
        JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      return { token };
    } catch (error: any) {
      if (error.message === "Invalid username or password") {
        throw error;
      }
      throw new Error(`Internal server error: ${error.message || error}`);
    }
  }
}

export const authService = new AuthService();
