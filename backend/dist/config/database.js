"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv = __importStar(require("dotenv"));
const dotenv_config_1 = require("./dotenv.config");
dotenv.config();
const sequelize = new sequelize_1.Sequelize(dotenv_config_1.local.DB_NAME, dotenv_config_1.local.DB_USER, dotenv_config_1.local.DB_PASSWORD, {
    host: dotenv_config_1.local.DB_HOST,
    dialect: 'mysql',
});
exports.default = sequelize;
// import { Sequelize } from "sequelize";
// import * as dotenv from "dotenv";
// // import { config } from "dotenv";
// dotenv.config();
// const sequelize = new Sequelize(
//     process.env.DB_NAME as string,
//     process.env.DB_USER as string,
//     process.env.DB_PASSWORD as string,
//     {
//         host: process.env.DB_HOST as string,
//         dialect: 'mysql',
//     }
// );
// export const dbconnect = () =>{
//     sequelize.sync({alter:true}).then(()=>{
//         console.log("database connected and syncronized successfully")
//     }).catch((err) =>{
//         console.log(err);
//         console.log("Problem in creating user")
//     })
//     console.log(process.env.DB_NAME);
// }
// export default dbconnect;
