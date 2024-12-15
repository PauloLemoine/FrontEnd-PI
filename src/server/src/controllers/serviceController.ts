import { Router } from 'express';

import { auth } from '../middlewares/authMiddleware.ts';

import { GetAllServices } from '../useCases/services/GetAllServices.ts';
import { GetServiceById } from '../useCases/services/GetServiceById.ts';
import { HomeServices } from '../useCases/services/HomeServices.ts';

export const servicesRouter = Router();

servicesRouter.get('/servicos/home', HomeServices);

servicesRouter.get('/servicos', auth, GetAllServices);

servicesRouter.get('/servicos/:servicoId', auth, GetServiceById);
