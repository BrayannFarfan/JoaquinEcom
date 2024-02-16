import { Products } from '../models/Products.js';
import { Highs } from '../models/Highs.js';
import { Color } from '../models/Color.js';


export const GetAllProducts = async ( req, res ) => {

    try {

        const getAllProducts = await Products.findAll({
            include: [
              {
                model: Highs,
                as: 'highs',
                include: [
                  {
                    model: Color,
                    as: 'colors',
                  },
                ],
              },
            ],
          });
        
        return res.status( 200 ).json( {getAllProducts} );
        
    } catch ( error ) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}
export const GetOneProducts = async (req, res) => {

    const { id } = req.params;

  try {
    const product = await Products.findByPk(id, {
      include: [
        {
          model: Highs,
          as: 'highs',
          include: [
            {
              model: Color,
              as: 'colors',
            },
          ],
        },
      ],
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Ensure talles and colors are always populated, even if empty arrays
    product.highs = product.highs || [];
    for (const tall of product.highs) {
      tall.colors = tall.colors || [];
    }

    res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
    // const { id } = req.params;
    // try {
    //     const getOneProducts = await Products.findByPk(id);

    //     if (!getOneProducts) return res.status(404).json({ message: 'Product not found' });

    //     return res.status(200).json({getOneProducts});
    // } catch (error) {
    //     console.error(error); // Imprime el error en la consola para debuggear
    //     return res.status(500).json({ message: 'Error interno del servidor' });
    // }
};
export const CreateProducts = async ( req, res ) => {

    try {
        const { name, price, description, stock, variants } = req.body;

        if (!req.files || req.files.length === 0) {
            throw new Error('No se recibieron imágenes');
          }

        const images = req.files.map(file => file.filename).join(',');

        const product = await Products.create({ name, price, description, stock,images});


        const tallesCreados = await Promise.all(

            variants.map(async (talle) => {
                let talleCreado = await Highs.create({
                  name: talle.name,
                  productoId: product.id,
                  stock: talle.stock
                });
            
                let coloresCreados = []; 
            
                if (talle.colors && Array.isArray(talle.colors)) {
                  coloresCreados = await Promise.all(
                    talle.colors.map(async (color) => {
                      return await Color.create({
                        name: color.name,
                        talleId: talleCreado.id,
                        stock: color.stock
                      });
                    })
                  );
                }
            
                talleCreado.addColor(coloresCreados);
                return talleCreado;
              })
          );
        
          product.variants = tallesCreados;
        product.image = images;
        await product.save();
        
          res.status(200).json({ message: 'Producto creado exitosamente', product });

    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto', error: error.message });
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