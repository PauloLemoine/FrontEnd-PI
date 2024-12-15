import { Router } from 'express';

import { auth } from '../middlewares/authMiddleware.ts';

import { CreateSchedule } from '../useCases/schedules/CreateSchedule.ts';
import { GetSchedulesByUserId } from '../useCases/schedules/GetSchedulesById.ts';

export const schedulesRouter = Router();

schedulesRouter.post('/agendamentos', auth, CreateSchedule);

schedulesRouter.get(
  '/agendamentos/usuarios/:userId',
  auth,
  GetSchedulesByUserId
);
