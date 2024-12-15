import { Router } from 'express';
import { loginUser } from '../useCases/login/LoginUser.ts';

export const loginRouter = Router();

loginRouter.post('/login', loginUser);
