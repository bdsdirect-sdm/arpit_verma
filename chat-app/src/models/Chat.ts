import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export class Chat extends Model {
    public id!: number;
    public job_seeker_id!: number;
    public agency_id!: number;
    public status!: 'pending' | 'accepted' | 'declined';
}

Chat.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    job_seeker_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    agency_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'accepted', 'declined'),
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'chats',
});
