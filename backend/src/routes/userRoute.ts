import { Router } from 'express';
import { register,getUsers, loginUser} from '../controllers/userController'
import {verifyToken} from '../middleware/userMiddleware'

const router = Router();

router.post('/signup', register);
router.get('/getuser',  verifyToken, getUsers);
router.post('/login', loginUser);
// router.post('/profile', loginUser)

export default router;
