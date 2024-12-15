import { Router } from 'express';
import { CreateUser } from '../useCases/users/CreateUser.ts';
export const usersRouter = Router();

usersRouter.post('/usuarios', CreateUser);
