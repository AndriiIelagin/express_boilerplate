import express from 'express';
import { httpLogger } from './config/logger.js';
import { applySecurityMiddlewares } from './middlewares/security.middleware.js';
import routes from './routes/index.js';
import notFoundMiddleware from './middlewares/notFound.middleware.js';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

applySecurityMiddlewares(app);
app.use(httpLogger);
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;