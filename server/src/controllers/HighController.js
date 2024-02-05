import  { Highs } from '../models/Highs.js'


export const getAllHigh = async (req, res) =>{
    try {
        const getAllHigh = await Highs.findAll();
        return res.status(200).json(getAllHigh);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}
export const getOneHigh = async (req, res) =>{
    const { id } = req.params;
    try {
        const getOneHigh = await Highs.findByPk(id);
        return res.status(200).json(getOneHigh);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}
export const createHigh = async (req , res) => {
    const { name, stock } = req.body;
    try {
        const newHigh = await Highs.create({name, stock});
        return res.status(200).json({msg:'High created',newHigh, ok: 200})
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const updateHigh = async (req, res) => {
    const { id } = req.params;
    const { name, stock } = req.body;

    try {
        const high = await Highs.findByPk(id);

        if (!high) {
            return res.status(404).json({ message: `high with id ${id} not found` });
        }

        if (name) {
            high.name = name;
        }
        if (stock || stock === 0) {
            high.stock = stock;
        }

        await high.save();

        return res.status(200).json({ message: 'high updated successfully', high, ok: 200 });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteHigh = async (req, res) => {
    const { id } = req.params;

    try {
        const deleteHigh = await Highs.destroy( { where: { id } } );
        return res.status(200).json({deleteHigh})
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}