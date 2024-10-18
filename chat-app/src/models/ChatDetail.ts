import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export class ChatDetail extends Model {
    public id!: number;
    public chat_id!: number;
    public sender_id!: number;
    public receiver_id!: number;
    public message!: string;
}

ChatDetail.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    chat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    receiver_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'chat_details',
});
