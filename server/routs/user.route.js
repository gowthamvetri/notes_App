import {Router} from 'express'
import { login, CreateUser,getUser } from '../controllers/user.controller.js'
import { authenticateToken } from '../utilities.js';

const userRout = Router()

userRout.post('/register',CreateUser);
userRout.post('/login',login)
userRout.get('/get-user',authenticateToken,getUser)

export default userRout