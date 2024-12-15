const PORT = import.meta.env.VITE_PORT;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

export const env = {
  port: PORT,
  baseURL: BASE_URL,
  secretKey: SECRET_KEY,
};
