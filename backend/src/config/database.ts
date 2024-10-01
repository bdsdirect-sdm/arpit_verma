import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('auth', 'root','Password123#@!',
{
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;




















// import { Sequelize } from "sequelize";


// const sequelize = new Sequelize("auth", "root", "Password123#@!", {
//     host: "localhost",
//     dialect: 'mysql',
//   });

  
// export default sequelize;