import express from "express";
import { createHigh, updateHigh, getAllHigh, getOneHigh, deleteHigh } from "../controllers/HighController.js";
export const HighRouter = express.Router();

HighRouter.get('/', getAllHigh);
HighRouter.get('/:id', getOneHigh);
HighRouter.post('/', createHigh);
HighRouter.put('/:id', updateHigh);
HighRouter.delete('/:id', deleteHigh);