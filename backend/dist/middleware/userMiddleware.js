"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "Arpit@123";
const verifyToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token)
        return res.status(403).send({ message: "No token provided!" });
    const user = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    if (!user) {
        return res.status(401).send({ message: "Unauthorized!" });
    }
    req.user = user;
    next();
};
exports.verifyToken = verifyToken;
