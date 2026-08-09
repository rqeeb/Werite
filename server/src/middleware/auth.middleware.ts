import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      error: "Not authenticated",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET!);

    req.userId = (decoded as { userId: string }).userId;

    next();
  } catch {
    return res.status(401).json({
      error: "Invaild or expired token",
    });
  }
};
