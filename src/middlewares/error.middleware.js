import { HTTP_STATUS } from '../constants/httpStatus.js';
import env from '../config/env.js';

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    details: err.details || null,
    ...(env.isProduction ? {} : { stack: err.stack })
  });
};

export default errorMiddleware;