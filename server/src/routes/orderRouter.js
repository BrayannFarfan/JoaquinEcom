import express from "express";
import { OrderController } from "../controllers/orderController.js";
export const OrderRouter = express.Router();

OrderRouter.put('/:orderId', OrderController);