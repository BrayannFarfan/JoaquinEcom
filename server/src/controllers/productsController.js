import { Products } from '../models/Products.js';
import { ProductColorHigh } from '../models/ProductColorHigh.js';
import { Highs } from '../models/Highs.js';
import { Color } from '../models/Color.js';
import { db } from '../config/dbConfig.js';


export const GetAllProducts = async ( req, res ) => {

    try {

        const getAllProducts = await Products.findAll();
        return res.status( 200 ).json( getAllProducts );
        
    } catch ( error ) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const GetOneProducts = async ( req, res ) => {

    const { id } = req.params;
    try {
        
        const getOneProducts = await Products.findByPk(id);

        if ( !getOneProducts ) return res.status( 404 ).json( { message: 'Product not found' } );

     return res.status( 200 ).json( getOneProducts );

    } catch ( error ) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const CreateProducts = async ( req, res ) => {

    try {
        const { name, price, description, stock, colorId, highId } = req.body;

        const images = req.files.map( file => file.filename );
      
        const product = await Products.create({ name, price, description, stock, image:images.join(',') });
      
        const associations = [];
      
        for (let i = 0; i < Math.min(colorId.length, highId.length); i++) {
          const colorIdItem = colorId[i];
          const highIdItem = highId[i];
      
          associations.push({ productId: product.id, colorId: colorIdItem, highId: highIdItem });
        }
      
        await ProductColorHigh.bulkCreate(associations);
      
        res.json({ message: 'Producto creado exitosamente' });
      } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto' });
      }
}

export const UpdateProducts = async ( req, res) => {

    const { id } = req.params;

    try {
        const updateProducts = await Products.findByPk(id );
        if( !updateProducts ) return res.status( 404 ).json( { message: 'Product not found' } );

        if( req.files && req.files.length > 0 ) {
            const images = req.files.map( file => file.filename );
            updateProducts.image = images.join(',');
        }

        await updateProducts.update( req.body );
        await updateProducts.save();
        return res.status( 200 ).json( { message: 'Product updated', updateProducts } );
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
    
}

export const DeleteProducts = async ( req, res) => {
    const { id } = req.params;

    try {
        const deleteProducts = await Products.destroy( { where: { id } } );
        return res.status( 200 ).json( deleteProducts );
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}