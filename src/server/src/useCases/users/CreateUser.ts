/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import bcrypt from 'bcryptjs';
import { IUser } from 'interfaces/IUser.ts';
import { readData, writeData } from '../../utils/databaseManager.ts';

export const CreateUser = async (req: Request, res: Response): Promise<any> => {
  const { nome, cpf, senha } = req.body;

  try {
    const users = await readData('usuarios');
    const userExists = users.find((user: IUser) => user.cpf === cpf);

    if (userExists) {
      return res.status(409).json({ error: 'Usuário já existe com este CPF.' });
    }

    const saltRounds = 8;
    const passwordHash = await bcrypt.hash(senha, saltRounds);

    const newUser = {
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
      nome,
      cpf,
      senha: passwordHash,
    };

    await writeData('usuarios', newUser);

    return res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao criar o usuário.' });
  }
};
