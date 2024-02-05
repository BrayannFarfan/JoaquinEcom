import express from "express";
import { PayController } from "../controllers/payController.js";

export const PayRouter = express.Router();

PayRouter.post('/checkout', PayController);