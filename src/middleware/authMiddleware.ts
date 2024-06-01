// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import 'dotenv/config'


const secretKey = process.env.JWT_SECRET  as string;

console.log(secretKey)

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void | Response => {
  const authHeader = req.headers['authorization'] || req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header is missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token', error: err });
    }

    req.body.user = user;
    next();
  });
};
