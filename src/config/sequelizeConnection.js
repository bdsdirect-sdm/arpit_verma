const {Sequelize} = require("sequelize");


const sequelize = new Sequelize('practice', 'root', 'Password123#@!',{
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(()=>{
    console.log('Connection Successfull');
}).catch((error)=>{
    console.log('Unable to Connect:', error);
});

module.exports = sequelize;