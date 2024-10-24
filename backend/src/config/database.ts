import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
import { local } from './dotenv.config';

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
