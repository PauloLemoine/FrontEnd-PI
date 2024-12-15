import 'dotenv/config';

const PORT = process.env.PORT!;
const SECRET_KEY = process.env.SECRET_KEY!;

export const env = {
  port: PORT,
  secretKey: SECRET_KEY,
};
