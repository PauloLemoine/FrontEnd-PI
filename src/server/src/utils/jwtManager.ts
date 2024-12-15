import jwt from 'jsonwebtoken';

import { env } from '../config/env.ts';

type JwtPayload = {
  id: string;
  nome: string;
  cpf: string;
};

export const generateToken = (payload: JwtPayload) => {
  return jwt.sign(payload, `${env.secretKey}`, { expiresIn: '7d' });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, `${env.secretKey}`) as JwtPayload;
};
