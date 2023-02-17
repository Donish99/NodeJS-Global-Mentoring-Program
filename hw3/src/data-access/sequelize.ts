import { Sequelize } from 'sequelize';
import config from '../config'


const sequelize = new Sequelize(config.DB.name, config.DB.user, config.DB.password, {
    host: 'localhost',
    dialect: 'postgres'
  })

export default sequelize;
