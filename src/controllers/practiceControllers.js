const User = require('../models/practiceModel');

const getUsers = async(req,res)=>{
    try{
        const users = await User.findAll();
        res.json(users);
    }catch (error){
        res.status(500).json({error:'Internal Server error'})
    }
};

const createUsers = async(req,res)=>{
    console.log('req.body ',req.body);
    
    const {firstName, lastName, email} = req.body;
    try{
        const newUser = await User.create({
            firstName,
            lastName,
            email
        });
        res.status(201).json(newUser)
    } catch (error){
        res.status(500).json({error:'Internal Server error'})
    }
};

module.exports = {getUsers,createUsers};
