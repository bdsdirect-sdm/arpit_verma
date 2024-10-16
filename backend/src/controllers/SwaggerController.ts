import { local } from "../config/dotenv.config";
import User from "../models/swaggerModel";
import jwt from "jsonwebtoken";

const JWT_SECRET = local.JWT_SECRET

const getUsers = async (req: any, res: any): Promise<void> => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server error' });
    }
};

const createUsers = async (req: any, res: any): Promise<void> => {
    console.log('req.body ', req.body);

    const { firstName, lastName, email }: { firstName: string; lastName: string; email: string } = req.body;
    
    try {
        const newUser = await User.create({
            firstName,
            lastName,
            email,
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server error' });
    }
};

// Login controller
const login = async (req: any, res: any): Promise<void> => {
    // console.log('req.body', req.body);

    const { firstName }: { firstName: string } = req.body;
    
    try {
        const user = await User.findOne({ where: { firstName } });
        
        if (user) {
            const token = jwt.sign({ user }, JWT_SECRET);
            console.log(token);
            const check = jwt.verify(token, JWT_SECRET);
            console.log(check); 
            res.json({ user, token });
        } else {
            res.status(404).send("Not Found");
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server error' });
    }
};

export { getUsers, createUsers, login };