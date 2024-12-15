import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from '../utils/jwtManager.ts';

export interface ICustomRequest extends Request {
  token: string | JwtPayload;
}

const getTokenFrom = (request: Request) => {
  const authorization = request.headers.authorization;

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }

  return null;
};

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = getTokenFrom(req);

  if (!token) {
    return res.status(401).send({ error: 'token não fornecido' });
  }

  const verifiedToken = verifyToken(token);

  if (!verifiedToken) {
    return res.status(401).json({
      message: 'Não autorizado.',
    });
  }

  (req as ICustomRequest).token = verifiedToken;
  return next();
};

export const auth = (req: Request, res: Response, next: NextFunction) => {
  authMiddleware(req, res, next);
};
