import express from "express";
import { DeleteProducts, GetAllProducts, GetOneProducts, UpdateProducts, CreateProducts } from "../controllers/productsController.js";
export const ProductsRouter = express.Router();
import { AuthToken, isAdmin } from '../middlewares/Authentication.js';
import { upload } from "../middlewares/multerConfig.js";

ProductsRouter.get('/', AuthToken, isAdmin , GetAllProducts);
ProductsRouter.get('/:id',AuthToken, isAdmin , GetOneProducts);
ProductsRouter.post('/',AuthToken, isAdmin , upload.array('images', 5) , CreateProducts);
ProductsRouter.put('/:id', AuthToken, isAdmin ,upload.array('images', 5) , UpdateProducts);
ProductsRouter.delete('/:id', AuthToken, isAdmin ,DeleteProducts);