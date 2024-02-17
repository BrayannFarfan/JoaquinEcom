import express from "express";
import { getAllCategories, getOneCategories } from "../controllers/CategoriesController.js";
export const CategorieRouter = express.Router();

CategorieRouter.get('/', getAllCategories);
CategorieRouter.get('/:id', getOneCategories);