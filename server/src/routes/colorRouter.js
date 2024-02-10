import express from "express";
import { createColor, updateColor, deleteColor,getAllColor,getOneColor  } from "../controllers/ColorController.js";
export const ColorRouter = express.Router();

ColorRouter.get('/', getAllColor);
ColorRouter.get('/:id', getOneColor);
ColorRouter.post('/', createColor);
ColorRouter.put('/:id', updateColor);
ColorRouter.delete('/:id', deleteColor);