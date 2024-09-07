// types/express.d.ts
import {Request} from "express";
import {JwtPayload} from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}
