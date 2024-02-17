import { Products } from '../models/Products.js';
import { Highs } from '../models/Highs.js';
import { Color } from '../models/Color.js';
import { Category } from '../models/Category.js';


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
              {
                model: Category,
                as: 'category',
              }
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
        {
          model: Category,
          as: 'category',
        }
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

    const productWithCategory = {
      ...product.dataValues,
      category: product.category.dataValues,
    };

   return res.status(200).json({ product: productWithCategory });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
export const CreateProducts = async ( req, res ) => {

    try {
        const { name, price, description, stock, variants, nombreCategoria } = req.body;

        if (!req.files || req.files.length === 0) {
            return  res.status(200).json({ message: 'No se recibieron imágenes' });
          }

        const images = req.files.map(file => file.filename).join(',');

        let categoria = await Category.findOne({
          where: { name: nombreCategoria },
        });
    
        // Si la categoría no existe, se crea
        if (!categoria) {
          categoria = await Category.create({ name: nombreCategoria });
        }
    
        // Verificar si el producto ya está asociado a la categoría
        let productoAsociado = await Products.findOne({
          where: {
            name,
            categoryId: categoria.id,
          },
        });
    
        if (productoAsociado) {
          return  res.status(200).json({ message: 'El producto ya está asociado a la categoría' });
        }

        const product = await Products.create({ name, price, description, stock,images, categoryId: categoria.id});


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
        
         return res.status(200).json({ message: 'Producto creado exitosamente', product });

    } catch (error) {
        return res.status(500).json({ error: 'Error al crear el producto', error: error.message });
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