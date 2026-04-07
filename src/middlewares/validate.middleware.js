import { HTTP_STATUS } from '../constants/httpStatus.js';
import ApiError from '../utils/ApiError.js';

const validate = (schema, property = 'body') => (req, res, next) => {
  const { error, value } = schema.validate(req[property], {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    return next(
      new ApiError(
        HTTP_STATUS.UNPROCESSABLE_ENTITY,
        'Validation failed',
        error.details.map((item) => ({
          message: item.message,
          path: item.path
        }))
      )
    );
  }

  req[property] = value;
  next();
};

export default validate;