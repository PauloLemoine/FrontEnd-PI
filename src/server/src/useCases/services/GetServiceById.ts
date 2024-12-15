/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { IService } from 'interfaces/IService.ts';
import { readData } from '../../utils/databaseManager.ts';

export const GetServiceById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const servicoId = parseInt(req.params.servicoId);

  try {
    const services = await readData('servicos');
    const serviceExists = services.find(
      (service: IService) => service.id === servicoId
    );

    if (!serviceExists) {
      return res.status(404).json({ error: 'Serviço não encontrado.' });
    }

    if (serviceExists) {
      return res.status(200).json(serviceExists);
    }

    return res.status(404).json({ error: 'Serviço não encontrado.' });
  } catch (error) {
    console.error('Erro ao buscar agendamento:', error);
    return res.status(500).json({ error: 'Erro ao buscar o agendamento.' });
  }
};
