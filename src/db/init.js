import db from '../models/index.js';

const initDatabase = async () => {
  await db.sequelize.authenticate();
  await db.sequelize.sync();
};

export default initDatabase;