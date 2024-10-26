"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userModel_1 = __importDefault(require("./models/userModel"));
const router_1 = __importDefault(require("./routes/router"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
userModel_1.default.sync({ alter: true }).then(() => {
    console.log("Database Connected Successfully");
}).catch((err) => {
    console.log(err);
    console.log("Problem creating user");
});
app.listen(PORT, () => {
    console.log(`Server is running on the port'; ${PORT}`);
});
app.use("/users", router_1.default);
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
