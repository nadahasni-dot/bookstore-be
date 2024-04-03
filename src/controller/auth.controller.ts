import { Request, Response } from "express";
import { authenticateUser, signUpNewUser } from "../service/auth.service";

const signUp = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const result = await signUpNewUser({ name, email, password });

  res.send(result).status(result.code);
};

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await authenticateUser({ email, password });

  res.send(result).status(result.code);
};

export { signUp, signIn };
