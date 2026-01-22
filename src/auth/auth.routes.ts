import express, { Request, Response } from "express";
import { authService } from "./auth.service";
import { userService } from "../user/user.service";

const authRouter = express.Router();

authRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const result = await userService.createUser(user);
    res.status(201).send(result);
  } catch (error: any) {
    if (error.message === "Username already exists") {
      res.status(409).send({ message: "Username already exists" });
    } else {
      res.status(500).send({ message: "Internal server error" });
    }
  }
});

authRouter.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const result = await authService.login(username, password);
    res.send(result);
  } catch (error: any) {
    if (error.message === "JWT_SECRET is not configured") {
      res.status(500).send({ message: error.message });
    } else if (error.message === "Invalid username or password") {
      res.status(401).send({ message: error.message });
    } else {
      res.status(500).send({ message: "Internal server error" });
    }
  }
});

export default authRouter;
