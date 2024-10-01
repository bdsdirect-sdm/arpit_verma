"use strict";
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
exports.loginUser = exports.getUsers = exports.register = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "Arpit@123";
// createUser
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.password = yield bcrypt_1.default.hash(req.body.password, 10);
        const user = yield userModel_1.default.create(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
});
exports.register = register;
// GetUser
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req);
        const users = yield userModel_1.default.findAll();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getUsers = getUsers;
// Login
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel_1.default.findOne({ where: { email } });
        if (user) {
            const check = yield bcrypt_1.default.compare(password, user.password);
            if (check) {
                const token = jsonwebtoken_1.default.sign({ user }, JWT_SECRET);
                res.status(200).json({ token: token });
            }
        }
        else {
            res.status(500).json({ message: 'user doesnot exist' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.loginUser = loginUser;
// Profile
// import { Request, Response } from 'express';
// import User from '../models/userModel';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
