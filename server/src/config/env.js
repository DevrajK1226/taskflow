import dotenv from 'dotenv';
dotenv.config();

function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

export const env = {
  port: Number(process.env.PORT) || 5000,
  mongoUri: required('MONGODB_URI'),
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
};
