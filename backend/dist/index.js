"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const messageModel_1 = __importDefault(require("./models/messageModel"));
const user_1 = __importDefault(require("./models/user"));
const body_parser_1 = __importDefault(require("body-parser"));
const router_1 = __importDefault(require("./routes/router"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const socket_1 = require("./socket");
const socket_2 = require("./socket");
const app = (0, express_1.default)();
const port = process.env.PORT;
const checkconnection = async () => {
    try {
        try {
            await database_1.default.authenticate();
            console.log("Database connection successful!");
        }
        catch (error) {
            console.error("Unable to connect to the database:", error);
        }
        await user_1.default.sync({ alter: true });
        console.log(" User Model sync successfully.");
        await messageModel_1.default.sync({ alter: true });
        console.log("Messages Model sync successfully");
        app.listen(port, () => {
            console.log(`Server is listening on the port: ${port}`);
        });
    }
    catch (error) {
        console.log(error, "errrrrr");
    }
    (0, socket_1.setSocket)(socket_2.httpServer);
    console.log("The Socket is on the port 4400");
};
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
checkconnection();
app.use((0, cors_1.default)({
    origin: '*',
}));
app.use(body_parser_1.default.json());
app.use("/users", router_1.default);
