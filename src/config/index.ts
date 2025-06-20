import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const ORIGIN = process.env.CREDENTIALS === 'true';
// export const ORIGIN = process.env.ORIGIN != undefined ? process.env.ORIGIN : '*';
export const { NODE_ENV, PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_DATABASE, SECRET_KEY, LOG_FORMAT, LOG_DIR } = process.env;
