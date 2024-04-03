import { User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "SECRET";

export interface CustomRequest extends Request {
  user: User;
}

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.replace("Bearer ", "")
      : "";

    const decoded = jwt.verify(token, JWT_SECRET) as User;

    (req as CustomRequest).user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      status: false,
      message: "not authorized to access this resources",
    });
  }
};
