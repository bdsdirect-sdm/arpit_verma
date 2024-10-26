"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const multer_1 = require("../middlewares/multer");
// import {} from  "../middlewares/"
const userRoutes = (0, express_1.Router)();
userRoutes.post("/", multer_1.upload.fields([{ name: "companyLogo" }, { name: "ProfileImage" }]), userController_1.createUser);
exports.default = userRoutes;
