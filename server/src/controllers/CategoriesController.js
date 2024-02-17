import  { Category } from '../models/Category.js';
import { Color } from '../models/Color.js';
import { Highs } from '../models/Highs.js';
import { Products } from '../models/Products.js';




export const getAllCategories = async (req, res ) => {
    try {
        const getAllCategories = await Category.findAll();
        return res.status(200).json(getAllCategories);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const getOneCategories = async (req, res ) => {
    const { id } = req.params
    try {
        const getOneCategories = await Category.findByPk(id,{
            include:[
                {
                    model: Products,
                    as: 'products',
                    include:[
                        {
                            model:Highs,
                            as: 'highs',
                            include:[
                                {
                                    model:Color,
                                    as: 'colors'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        if (!getOneCategories) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
          
        return res.status(200).json({getOneCategories});
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}