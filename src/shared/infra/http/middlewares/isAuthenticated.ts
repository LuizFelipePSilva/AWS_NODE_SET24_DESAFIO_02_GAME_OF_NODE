import jwt from '@config/auth';
import { NextFunction, Request, Response } from 'express';
import { Secret, verify } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError'

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}
export default function isAuthenticate(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missed');
  }
  const [, token] = authHeader.split(' ');
  try {
    const decodedToken = verify(token, jwt.jwt.secret as Secret);
    const { sub } = decodedToken as ITokenPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT Token');
  }
}
