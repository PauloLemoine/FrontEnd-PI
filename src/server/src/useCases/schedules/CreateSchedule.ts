/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import { IEmployee } from 'interfaces/IEmployee.ts';
import { IService } from 'interfaces/IService.ts';
import { IUser } from 'interfaces/IUser.ts';

import { readData, writeData } from '../../utils/databaseManager.ts';

export const CreateSchedule = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { usuarioId, servicoId, funcionarioId, data_hora } = req.body;

  try {
    const users = await readData('usuarios');
    const userExists = users.find((user: IUser) => user.id === usuarioId);

    if (!userExists) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const services = await readData('servicos');
    const serviceExists = services.find(
      (service: IService) => service.id === servicoId
    );

    if (!serviceExists) {
      return res.status(404).json({ error: 'Serviço não encontrado.' });
    }

    const employees = await readData('funcionarios');
    const employeeExists = employees.find(
      (employee: IEmployee) => employee.id === funcionarioId
    );

    if (!employeeExists) {
      return res.status(404).json({ error: 'Funcionário não encontrado.' });
    }

    const schedules = await readData('agendamentos');
    const newSchedule = {
      id: schedules.length > 0 ? schedules[schedules.length - 1].id + 1 : 1,
      usuarioId,
      servicoId,
      funcionarioId,
      data_hora,
    };

    await writeData('agendamentos', newSchedule);

    return res.status(201).json(newSchedule);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao criar o agendamento.' });
  }
};
