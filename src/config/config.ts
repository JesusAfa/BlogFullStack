import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    posgrest: {
      dbname: process.env.POSGRES_DATABASE,
      port: parseInt(process.env.POSGRES_PORT, 10),
      password: process.env.POSGRES_ROOT_PASSWORD,
      user: process.env.POSGRES_USER,
      host: process.env.POSGRES_HOST,
    },
    apikey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
  };
});
