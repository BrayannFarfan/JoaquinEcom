import express from "express";
import { Login, Register } from '../controllers/userAuthController.js'
export const UserAuthRouter = express.Router();


UserAuthRouter.post( '/login', Login);
UserAuthRouter.post('/register', Register);

