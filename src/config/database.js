import { Sequelize } from 'sequelize';
import env from './env.js';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: env.sqliteStorage,
  logging: env.isProduction ? false : console.log,
//   define: {
//     underscored: true,
//     timestamps: true,
//     paranoid: true
//   }
});

export default sequelize;