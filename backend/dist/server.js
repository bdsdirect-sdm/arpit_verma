"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../src/config/database");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 4400;
(0, database_1.dbconnect)();
app.listen(port, () => {
    console.log(`Server is listening on the port: ${port}`);
});
exports.default = app;
