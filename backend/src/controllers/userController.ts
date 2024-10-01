import { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcrypt';
import { error } from 'console';
import jwt from 'jsonwebtoken';

const JWT_SECRET="Arpit@123";


// createUser
export const register = async (req: any, res: any) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = await User.create(req.body);
   
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

// GetUser
export const getUsers = async (req: Request, res: Response): Promise<void> =>{
  try{
    console.log(req);
      const users = await User.findAll();
         res.status(200).json(users);
  }catch(error: any){
      res.status(500).json({message: error.message});
  }
};


// Login

export const loginUser = async(req : any, res: any): Promise<void> =>{
  try{
    const {email,password} = req.body;
    const user =  await User.findOne({where:{email}})
    if (user) {
      const check = await bcrypt.compare(password, user.password)
      if (check){
        const token = jwt.sign({user}, JWT_SECRET)
        res.status(200).json({token: token})
      }

    }else{
      res.status(500).json({message: 'user doesnot exist'})
    }
  }catch(error: any){
    res.status(500).json({message: error.message});
}
}

// Profile





























// import { Request, Response } from 'express';
// import User from '../models/userModel';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';


