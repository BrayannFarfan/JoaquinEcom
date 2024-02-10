import { DataTypes } from 'sequelize';
import { db } from '../config/dbConfig.js';


export const Products = db.define('products', {
    name: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.INTEGER
    },
    description: {
        type: DataTypes.STRING
    },
    stock:{
        type: DataTypes.INTEGER
    },
    image:{
        type: DataTypes.STRING
    },
    // stock_high:{
    //     type: DataTypes.JSON
    // },
    // stock_colors:{
    //     type: DataTypes.JSON
    // }
},{
    timestamps: false
})