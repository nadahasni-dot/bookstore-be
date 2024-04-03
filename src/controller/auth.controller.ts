import { Request, Response } from "express";
import { authenticateUser, signUpNewUser } from "../service/auth.service";

const signUp = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const result = await signUpNewUser({ name, email, password });

  res.status(result.code).send(result);
};

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await authenticateUser({ email, password });

  res.status(result.code).send(result);
};

export { signUp, signIn };
