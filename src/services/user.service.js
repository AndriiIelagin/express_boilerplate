import { HTTP_STATUS } from '../constants/httpStatus.js';
import ApiError from '../utils/ApiError.js';
import { findUserById } from '../repositories/user.repository.js';

export const getMyProfile = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found');
  }

  return user;
};