/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { readData } from '../../utils/databaseManager.ts';

export const GetAllServices = async (
  _req: Request,
  res: Response
): Promise<any> => {
  try {
    const services = await readData('servicos');

    return res.status(200).json(services);
  } catch (error) {
    console.error('Erro ao buscar serviços:', error);

    return res.status(500).json({ error: 'Erro ao buscar os serviços.' });
  }
};
