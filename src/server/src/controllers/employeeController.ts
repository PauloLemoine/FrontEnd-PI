import { Router } from 'express';
import { auth } from '../middlewares/authMiddleware.ts';
import { GetAllEmployees } from '../useCases/employees/GetAllEmployees.ts';

export const employeeRouter = Router();

employeeRouter.get('/funcionarios', auth, GetAllEmployees);
