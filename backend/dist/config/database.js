"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('auth', 'root', 'Password123#@!', {
    host: 'localhost',
    dialect: 'mysql',
});
exports.default = sequelize;
// import { Sequelize } from "sequelize";
// const sequelize = new Sequelize("auth", "root", "Password123#@!", {
//     host: "localhost",
//     dialect: 'mysql',
//   });
// export default sequelize;
