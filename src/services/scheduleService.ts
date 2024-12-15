import axios from 'axios';

import { env } from '../config/env';

const config = {
  headers: { Authorization: '' },
};

const setToken = (newToken: string) => {
  config.headers.Authorization = `bearer ${newToken}`;
};

const getSchedulingsByUser = async (userId: string) => {
  const response = await axios.get(
    `${env.baseURL}:${env.port}/agendamentos/usuarios/${userId}`,
    config
  );
  return response.data;
};

const createScheduling = async (data: {
  usuarioId: number;
  servicoId: number;
  funcionarioId: number;
  data_hora: string;
}) => {
  const response = await axios.post(
    `${env.baseURL}:${env.port}/agendamentos/`,
    data,
    config
  );
  return response.data;
};

export default {
  getSchedulingsByUser,
  createScheduling,
  setToken,
};
