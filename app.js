const express = require('express');
const sequelize = require('./src/config/sequelizeConnection');
const User = require('./src/models/practiceModel');
const practiceRoute = require('./src/routes/practiceRoute');
const apiDoc = require('./src/swagger-docs');
// const practiceControllers = require('./src/controllers/practiceControllers');




const app  = express();
const port = 3000;

// Middleware
app.use(express.json());
// Routes
app.use('/users',practiceRoute);
// Sync DataBase
sequelize.sync().then(() => {
    console.log("Database & Table created");
});

app.use(apiDoc);


app.get('/' ,(req,res) =>{
    res.send('Welcome!')
});

app.listen(port,()=>{
    console.log(`You are on port: ${port}`)
});