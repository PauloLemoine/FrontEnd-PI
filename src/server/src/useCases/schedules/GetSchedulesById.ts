/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { ISchedule } from 'interfaces/ISchedule.ts';
import { IUser } from 'interfaces/IUser.ts';
import { readData } from '../../utils/databaseManager.ts';

export const GetSchedulesByUserId = async (
  req: Request,
  res: Response
): Promise<any> => {
  const userId = parseInt(req.params.userId);

  try {
    const users = await readData('usuarios');
    const userExists = users.find((user: IUser) => user.id === userId);

    if (userExists) {
      const schedules = await readData('agendamentos');
      const userSchedules = schedules.filter(
        (schedule: ISchedule) => Number(schedule.usuarioId) === userId
      );

      if (userSchedules.length === 0) {
        return res
          .status(404)
          .json({ error: 'Nenhum Agendamento encontrado para este usuário.' });
      }

      return res.status(200).json(userSchedules);
    }

    return res.status(404).json({ error: 'Usuário não encontrado.' });
  } catch (error) {
    console.error('Erro ao buscar agendamento:', error);
    return res.status(500).json({ error: 'Erro ao buscar o agendamento.' });
  }
};
