import { Order } from "../models/Order.js";
import { Products } from "../models/Products.js";
import { db } from "../config/dbConfig.js";
import { sendConfirmationEmail } from '../services/Mailer.js';
import { User } from "../models/User.js";
import { Color } from "../models/Color.js";
import { Highs } from "../models/Highs.js";



export const PayController = async ( req, res ) =>{



  
    try {
        const { products, email } = req.body;

        if (!products || products.length === 0) {
          return res.status(400).json({ message: 'No products provided' });
      }
      
      const productsExist = await Products.findAll({
        where: {
            id: products.map(product => product.id)
        }
     });

     if (productsExist.length !== products.length) {
      return res.status(404).json({ message: 'One or more products not found in the database' });
     }

        const user = await User.findOne({ where: { email } });
      
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
      
        const order = await Order.create({ state: 'pending' });
      
        await order.setUser(user);
      
        const t = await db.transaction();
      
        try {
            let updatedProducts = {};
          for (const productInfo of products) {
      
            const { id, colorId, highId, quantity } = productInfo;
      
            const product = await Products.findByPk(id);
      
            if (!product) {
              await t.rollback();
              return res.status(404).json({ message: `Product with id ${id} not found` });
            }
      
            const color = await Color.findByPk(colorId);
            const high = await Highs.findByPk(highId);

            if (!color || !high) {
              await t.rollback();
              return res.status(400).json({ message: 'Color or High not found for the product' });
          }
      
            if (product.stock < quantity || color.stock < quantity || high.stock < quantity) {
              await t.rollback();
              return res.status(400).json({ message: 'Not enough stock for the selected products.' });
            }
      
            // Actualiza stock del producto, color y talla después de la compra
            const newProductStock = product.stock - quantity;
            const newColorStock = color.stock - quantity;
            const newHighStock = high.stock - quantity;

            if (newProductStock < 0 || newColorStock < 0 || newHighStock < 0) {
              await t.rollback();
              return res.status(400).json({ message: 'Invalid stock values after purchase' });
          }
      
            // Actualiza stock de Color y Highs
            await Color.update({ stock: newColorStock }, { where: { id: colorId }, transaction: t });
            await Highs.update({ stock: newHighStock }, { where: { id: highId }, transaction: t });
      
            updatedProducts[id] = newProductStock;
      
          }
      
          // Actualiza stock de Products en una transacción
          for (const productId in updatedProducts) {
            await Products.update({ stock: updatedProducts[productId] }, { where: { id: productId }, transaction: t });
          }
      
          
          await t.commit();
          
          //  detalles de pago y otras lógicas si es necesario
          for (const productDetail of products) {
            const productId = productDetail.id;
            const product = await Products.findByPk(productId);

            if (!product) {
                return res.status(404).json({ message: `Product with id ${productId} not found` });
            }
            await order.addProduct(product);
            order.trackingLink = `https://joaquinEcommerce.com/${order.id}`;
            await order.save();
            await sendConfirmationEmail(email, order.id, products, order.trackingLink, productDetail);
            return res.status(201).json({ message: 'Order created', orderId: order.id });
        }

          
        } catch (error) {
          await t.rollback();
          throw error;
        }
      } catch (error) {
        return res.status(500).json({ error: 'Error processing the purchase.' });
      }
}