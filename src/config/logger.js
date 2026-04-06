import morgan from 'morgan';
import env from './env.js';

export const httpLogger = morgan(env.logLevel);