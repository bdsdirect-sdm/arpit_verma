"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Messages extends sequelize_1.Model {
}
Messages.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    roomid: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    senderid: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    message: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    createdAt: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize: database_1.default,
    tableName: "messages",
});
exports.default = Messages;
