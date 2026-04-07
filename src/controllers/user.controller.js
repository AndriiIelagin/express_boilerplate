import { HTTP_STATUS } from '../constants/httpStatus.js';
import asyncHandler from '../utils/asyncHandler.js';
import { getMyProfile } from '../services/user.service.js';

export const me = asyncHandler(async (req, res) => {
  const user = await getMyProfile(req.user.sub);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: user
  });
});