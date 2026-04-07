import { HTTP_STATUS } from '../constants/httpStatus.js';
import ApiError from '../utils/ApiError.js';
import { comparePassword, hashPassword } from '../utils/password.js';
import { signAccessToken } from '../utils/jwt.js';
import { createUser, findUserByEmail } from '../repositories/user.repository.js';

export const registerUser = async ({ email, password, firstName, lastName }) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new ApiError(HTTP_STATUS.CONFLICT, 'Email is already in use');
  }

  const hashedPassword = await hashPassword(password);

  const user = await createUser({
    email: email.toLowerCase(),
    password: hashedPassword,
    firstName,
    lastName
  });

  if(!user) {
    throw new ApiError(HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Failed to create user');
  }

  const token = signAccessToken({
    sub: user.id,
    email: user.email,
    role: user.role
  });

  return { user, token };
};

export const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email.toLowerCase(), true);

  if (!user) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid email or password');
  }

  const passwordMatch = await comparePassword(password, user.password);

  if (!passwordMatch) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid email or password');
  }

  if (!user.isActive) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, 'User account is inactive');
  }

  const token = signAccessToken({
    sub: user.id,
    email: user.email,
    role: user.role
  });

  const safeUser = await findUserByEmail(user.email);

  return { user: safeUser, token };
};