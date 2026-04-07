import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import env from '../config/env.js';

export const applySecurityMiddlewares = (app) => {
  app.use(helmet());
  app.use(cors({ origin: env.appOrigin, credentials: true }));
  app.use(cookieParser());
};