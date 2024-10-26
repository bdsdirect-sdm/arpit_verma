import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
import { local } from './dotenv';

dotenv.config();

const sequelize = new Sequelize(
    local.DB_NAME as string,
    local.DB_USER as string,
    local.DB_PASSWORD as string,
    {
        host: local.DB_HOST as string,
        dialect: 'mysql',
    }
);

export default sequelize;