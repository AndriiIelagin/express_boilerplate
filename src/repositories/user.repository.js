import db from '../models/index.js';

const { User } = db;

export const createUser = async (payload) => await User.create(payload);

export const findUserByEmail = async (email, withPassword = false) => {
  return await User.scope(withPassword ? 'withPassword' : 'defaultScope').findOne({
    where: { email }
  });
};

export const findUserById = async (id) => {
  return await User.findByPk(id);
};