import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import Log from '../utils/logger';

const readKey = (_fileName: string): string => {
  const filePath = path.resolve(__dirname, `../../keys/${_fileName}`);
  if(fs.existsSync(filePath)) {
    const key = fs.readFileSync(filePath, 'utf8');
    return key;
  } 

  Log.error('Private/Public key not found, generate the keys', { "run": "npm run generate:keys" })
  Log.warn('RUN: npm run generate:keys')
  process.exit(1);
};

Log.info('ENV :: Registering the env file');
dotenv.config();

Log.info('ENV :: Initializes the configs');
export const ENV: string = process.env.NODE_ENV || 'development';
export const PORT: number = Number(process.env.PORT) || 5000;
export const ENABLE_CHILD_PROCESS: boolean = process.env.ENABLE_CHILD_PROCESS === 'YES';
export const IS_PRODUCTION: boolean = ENV === 'production';
export const PASS_PHRASE: string = process.env.PASS_PHRASE || '';
export const APP_SECRET: string = process.env.APP_SECRET || '98uhu5rfs0cve';
export const HASHING_ROUNDS: number = Number(process.env.HASHING_ROUNDS) || 10;
export const AUTH_TOKEN_ALGORITHM: any = process.env.AUTH_TOKEN_ALGORITHM || 'RS256';
export const AUTH_TOKEN_EXPIRERS: number = Number(process.env.AUTH_TOKEN_EXPIRERS) || 300;

export const MAIL_SENDER:string = process.env.MAIL_SENDER || 'website.com <support@website.com>';
export const CONTACT_EMAIL: string = process.env.CONTACT_EMAIL || 'admin@support.com';

export const APP_URL = process.env.APP_URL || `http://localhost:${PORT}`;
export const APP_NAME = process.env.APP_NAME || 'website.com';

export const MONGO_DB_URL: string = process.env.MONGO_DB_URL || '';

type AWS_TYPE = {
  region: string,
  accessKeyId: string,
  secretAccessKey: string
}
export const AWS: AWS_TYPE  = {
  region: process.env.AWS_REGION || 'us-west-2',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'XXXX',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'XXXX/XXXX',
};

export const PUBLIC_KEY: string = process.env.PUBLIC_KEY || readKey('public.pem');
export const PRIVATE_KEY: string = process.env.PRIVATE_KEY || readKey('private.pem');

export default {
  PORT,
  ENV,
  ENABLE_CHILD_PROCESS,
  IS_PRODUCTION,
  MONGO_DB_URL,
  PASS_PHRASE,
  APP_SECRET,
  HASHING_ROUNDS,
  AUTH_TOKEN_ALGORITHM,
  AUTH_TOKEN_EXPIRERS,
  AWS,
  MAIL_SENDER,
  CONTACT_EMAIL,
  APP_URL,
  PUBLIC_KEY,
  PRIVATE_KEY
};
