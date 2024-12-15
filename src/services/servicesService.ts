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
    `${env.baseURL}:${env.port}/servicos/`,
    config
  );
  return request.data;
};

const getHome = async () => {
  const request = await axios.get(`${env.baseURL}:${env.port}/servicos/home`);
  return request.data;
};

const getById = async (id: string) => {
  const request = await axios.get(
    `${env.baseURL}:${env.port}/servicos/${id}`,
    config
  );
  return request.data;
};

export default {
  setToken,
  getAll,
  getHome,
  getById,
};
