import axios from 'axios';

import { IRegisterForm } from '../interfaces/IRegisterForm';
import { IUser } from '../interfaces/IUser';

import { env } from '../config/env';

const config = {
  headers: { Authorization: '' },
};

const setToken = (newToken: string) => {
  config.headers.Authorization = `bearer ${newToken}`;
};

const create = async (clientData: IRegisterForm) => {
  const request = await axios.post(
    `${env.baseURL}:${env.port}/usuarios/`,
    clientData
  );
  return request.data;
};

const getById = async (id: string) => {
  const request = await axios.get(
    `${env.baseURL}:${env.port}/usuarios/${id}`,
    config
  );
  return request.data;
};

const update = async (id: string, newObject: IUser) => {
  const request = await axios.put(
    `${env.baseURL}:${env.port}/usuarios/${id}`,
    newObject,
    config
  );
  return request.data;
};

export default {
  create,
  update,
  getById,
  setToken,
};
