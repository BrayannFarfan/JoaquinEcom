import { DataTypes } from 'sequelize';
import { db } from '../config/dbConfig.js';

export const Highs = db.define('high', {
    name:{
        type: DataTypes.STRING
    },
    stock:{
        type: DataTypes.INTEGER
    }
},{
    timestamps: false
});