import  { Color } from '../models/Color.js'


export const getAllColor = async (req, res) =>{
    try {
        const getAllColors = await Color.findAll();
        return res.status(200).json(getAllColors);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}
export const getOneColor = async (req, res) =>{
    const { id } = req.params;
    try {
        const getOneColor = await Color.findByPk(id);
        return res.status(200).json(getOneColor);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const createColor = async (req , res) => {
    const { name, stock } = req.body;
    try {
        const newColor = await Color.create({name, stock});
        return res.status(200).json({msg:'High created',newColor , ok: 200})
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const updateColor = async (req, res) => {
    const { id } = req.params;
    const { name, stock } = req.body;

    try {
        const color = await Color.findByPk(id);

        if (!color) {
            return res.status(404).json({ message: `Color with id ${id} not found` });
        }

        if (name) {
            color.name = name;
        }
        if (stock || stock === 0) {
            color.stock = stock;
        }

        await color.save();

        return res.status(200).json({ message: 'Color updated successfully', color, ok: 200 });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteColor = async (req, res) => {
    const { id } = req.params;

    try {
        const deleteColor = await Color.destroy( { where: { id } } );
        return res.status(200).json({deleteColor})
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}