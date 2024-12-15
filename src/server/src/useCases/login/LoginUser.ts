/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

import { IUser } from 'interfaces/IUser.ts';
import { readData } from '../../utils/databaseManager.ts';
import { generateToken } from '../../utils/jwtManager.ts';

const validatePassword = async (senha: string, hash: string) => {
  return bcrypt.compare(senha, hash);
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const { cpf, senha } = req.body;

  try {
    const users = await readData('usuarios');
    const user = users.find((user: IUser) => user.cpf === cpf);

    if (!user) {
      return res.status(409).json({ error: 'Usuário não encontrado.' });
    }

    const isValidPassword = await validatePassword(senha, user.senha);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Senha inválida' });
    }

    const token = generateToken({
      id: user.id,
      nome: user.nome,
      cpf: user.cpf,
    });

    return res.json({
      user: {
        id: user.id,
        nome: user.nome,
        cpf: user.cpf,
      },
      token,
    });
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
