"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userMiddleware_1 = require("../middleware/userMiddleware");
const router = (0, express_1.Router)();
router.post('/signup', userController_1.register);
router.get('/getuser', userMiddleware_1.verifyToken, userController_1.getUsers);
router.post('/login', userController_1.loginUser);
// router.post('/profile', loginUser)
exports.default = router;
