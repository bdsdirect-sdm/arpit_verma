"use strict";
// import User from "../models/userModel";
// import { Request, Response } from "express";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import nodemailer from "nodemailer";
// const JWT_SECRET = "123";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../models/userModel")); // Adjust the import according to your file structure
const mailer_1 = require("../middlewares/mailer");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, lastname, companyName, email, phone, } = req.body;
        const { companyLogo } = req.files.companyLogo;
        const { ProfileImage } = req.files.ProfileImage;
        console.log("Request>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", req.body);
        // Check if the email already exists
        const existingUser = yield userModel_1.default.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
        // Generate a random password
        const generateRandomPassword = (length) => {
            return Math.random().toString(36).slice(-length);
        };
        const randomPass = generateRandomPassword(5);
        const hashedPassword = yield bcrypt_1.default.hash(randomPass, 10);
        // Create the user
        const user = yield userModel_1.default.create({
            firstname,
            lastname,
            email,
            phone,
            companyName,
            companyLogo,
            ProfileImage,
            password: hashedPassword,
        });
        const sendEmail = (to, subject, text) => __awaiter(void 0, void 0, void 0, function* () {
            const mailOptions = {
                from: "arpit8345@gmail.com",
                to,
                subject,
                text,
            };
            try {
                const info = yield mailer_1.transporter.sendMail(mailOptions);
                console.log("Email sent: " + info.response);
            }
            catch (error) {
                console.error("Error sending email:", error);
            }
        });
        yield sendEmail(email, "Welcome to Our Service", `Welcome ${firstname} ${lastname}! Thank you for signing up. Your one-time password is: ${randomPass}`);
        return res.status(201).json({ user });
    }
    catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Error creating user" });
    }
});
exports.createUser = createUser;
