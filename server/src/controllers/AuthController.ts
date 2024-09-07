// src/controllers/AuthController.ts
import {Request, Response} from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import {JWT_SECRET} from "../config/constants";

class AuthController {
  static async signup(req: Request, res: Response) {
    try {
      const {email, password, firstName, lastName} = req.body;

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await User.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
      });

      // Generate JWT
      const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: "1d"});

      res.status(201).json({token, user});
    } catch (error: any) {
      res.status(400).json({error: error.message});
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const {email, password} = req.body;

      // Find user by email
      const user = await User.findOne({where: {email}});
      if (!user) {
        return res.status(404).json({error: "User not found"});
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({error: "Invalid credentials"});
      }

      // Generate JWT
      const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: "1d"});

      res.status(200).json({token, user});
    } catch (error: any) {
      res.status(400).json({error: error.message});
    }
  }
}

export default AuthController;
