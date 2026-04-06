import sequelize from '../config/database.js';
import createUserModel from './user.model.js';

const db = {};

db.sequelize = sequelize;
db.User = createUserModel(sequelize);

export default db;