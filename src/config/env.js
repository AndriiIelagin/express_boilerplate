import dotenv from 'dotenv';

dotenv.config();

const requiredEnv = ['JWT_SECRET'];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing required env var: ${key}`);
  }
}

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3000,
  appOrigin: process.env.APP_ORIGIN || 'http://localhost:3000',
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 12,
  sqliteStorage: process.env.SQLITE_STORAGE || './database.sqlite',
  logLevel: process.env.LOG_LEVEL || 'dev',
  isProduction: (process.env.NODE_ENV || 'development') === 'production'
};

export default env;