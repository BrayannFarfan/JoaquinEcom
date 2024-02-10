import { DataTypes } from 'sequelize';
import { db } from '../config/dbConfig.js';

export const Color = db.define('color', {
    name:{
        type: DataTypes.STRING
    },
    stock:{
        type: DataTypes.INTEGER
    }
},{
    timestamps: false
});