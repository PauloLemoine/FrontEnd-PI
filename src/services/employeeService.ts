import axios from 'axios';

import { env } from '../config/env';

const config = {
  headers: { Authorization: '' },
};

const setToken = (newToken: string) => {
  config.headers.Authorization = `bearer ${newToken}`;
};

const getAll = async () => {
  const request = await axios.get(
    `${env.baseURL}:${env.port}/funcionarios`,
    config
  );
  return request.data;
};

export default {
  setToken,
  getAll,
};
