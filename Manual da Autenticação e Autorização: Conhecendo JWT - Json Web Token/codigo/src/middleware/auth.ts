import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export interface AuthPayload {
  email: string;
  iat?: number;
  exp?: number;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, env.jwtSecret, (err, user) => {
    if (err) return res.sendStatus(403);
    (req as any).user = user as AuthPayload;
    next();
  });
}
