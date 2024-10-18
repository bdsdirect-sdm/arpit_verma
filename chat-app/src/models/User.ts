import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export class User extends Model {
    public id!: number;
    public user_type!: 'job_seeker' | 'agency';
    public name!: string;
    public profile_photo!: string;
    public resume!: string;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_type: {
        type: DataTypes.ENUM('job_seeker', 'agency'),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    profile_photo: {
        type: DataTypes.STRING,
    },
    resume: {
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    tableName: 'users',
});
