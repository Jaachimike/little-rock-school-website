// src/middleware/authMiddleware.ts
import {Request, Response, NextFunction} from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import {JWT_SECRET} from "../config/constants";
import {AuthenticatedRequest} from "../types/express";

const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({error: "No token provided"});
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as string | JwtPayload;
    // good news
    req.user = decoded; // Attach decoded user to the request object
    next();
  } catch (error) {
    res.status(401).json({error: "Invalid token"});
  }
};

export default authMiddleware;
