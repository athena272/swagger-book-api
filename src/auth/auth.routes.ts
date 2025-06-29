import express, { Request, Response } from "express";
import { authService } from "./auth.service";
import { userService } from "../user/user.service";

const authRouter = express.Router();

authRouter.post("/register", async (req: Request, res: Response) => {
  const user = req.body;
  const result = await userService.createUser(user);
  res.status(201).send(result);
});

authRouter.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const result = await authService.login(username, password);
    res.send(result);
  } catch (error: any) {
    res.status(401).send({ message: error.message });
  }
});

export default authRouter;
