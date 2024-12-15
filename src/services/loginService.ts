import axios from 'axios';
import { env } from '../config/env';

const login = async (credentials: { cpf: string; senha: string }) => {
  const { data } = await axios.post(
    `${env.baseURL}:${env.port}/login`,
    credentials
  );
  return data;
};

export default { login };
