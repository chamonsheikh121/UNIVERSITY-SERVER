import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  mongodb_url: process.env.MONGODB_URL,
  salt_rounds: process.env.SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASSWORD,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_ACCESS_SECRET_TIME: process.env.JWT_ACCESS_SECRET_TIME,
  JWT_REFRESH_SECRET_TIME: process.env.JWT_REFRESH_SECRET_TIME,
  RESET_PASSWORD_UI_DOMAIN: process.env.RESET_PASSWORD_UI_DOMAIN,
};
