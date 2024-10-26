import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/userModel'; // Adjust the import according to your file structure
import nodemailer from 'nodemailer';
import { transporter } from "../middlewares/mailer";
import { JWT } from '../middlewares/token';
import jwt from "jsonwebtoken"
const JWT_SECRET="123";
export const createUser = async (req: any, res: any) => {
  try {
    const {
      firstname,
      lastname,
      companyName,
      email,
      phone,
      address,
    } = req.body;

 
    const companyLogo = req.files.companyLogo[0]?.path; 
    const ProfileImage = req.files.ProfileImage[0]?.path; 

    console.log("Request Body:", req.body);
    console.log("Uploaded Files:", req.files.ProfileImage);

    // Check if the email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Generate a random password
    const generateRandomPassword = (length: number): string => {
      return Math.random().toString(36).slice(-length);
    };

    const randomPass = generateRandomPassword(5);
    const hashedPassword = await bcrypt.hash(randomPass, 10);

    // Create the user
    const user = await User.create({
      firstname,
      lastname,
      email,
      phone,
      address,
      companyName,
      companyLogo,
      ProfileImage,
      password: hashedPassword,
    });

    const sendEmail = async (to: string, subject: string, text: string) => {
      const mailOptions = {
        from: "arpit8345@gmail.com",
        to,
        subject,
        text,
      };

      try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
      } catch (error) {
        console.error("Error sending email:", error);
      }
    };

    await sendEmail(
      email,
      "Welcome to Our Service",
      `Welcome ${firstname} ${lastname}! Thank you for signing up. Your one-time password is: ${randomPass}`
    );

    return res.status(201).json({ user });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Error creating user" });
  }
};


export const login = async (req: any, res: any) => {
  try {
      // console.log("BODYY::::", req.body)
      const { email, password } = req.body;
      console.log("printt", req.body);
      
  
      const user = await User.findOne({ where: { email } });
      if (!user) {
        res.status(401).json({ message: "Invalid email id" });
        return;
      }

      console.log("USER:::", user)
      
      const isPasswordValid = await bcrypt.compare(password, user.dataValues.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: "wrong password" });
        return;
      }
  
      const token = jwt.sign(
        {
          id: user.dataValues.id,
          firstname: user.dataValues.fname,
          lastname: user.dataValues.lname,
          email: user.dataValues.email,
          companyName: user.dataValues.brand,
          phone: user.dataValues.phone,
          address: user.dataValues.address,
        },
        JWT_SECRET
      );
      // console.log("TOKENNNNN", token)
  
      res.status(200).json({
        user,
        token,
      });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
}