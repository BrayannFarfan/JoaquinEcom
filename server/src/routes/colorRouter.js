import express from "express";
import { createColor, updateColor, deleteHigh, getAllHigh, getOneHigh } from "../controllers/ColorController.js";
export const ColorRouter = express.Router();

ColorRouter.get('/', getAllHigh);
ColorRouter.get('/:id', getOneHigh);
ColorRouter.post('/', createColor);
ColorRouter.put('/:id', updateColor);
ColorRouter.delete('/:id', deleteHigh);