import { DataTypes } from 'sequelize';
import { db } from '../config/dbConfig.js';

export const Order = db.define('order', {
    state:{
        type: DataTypes.STRING
    },
    trackingLink:{
        type: DataTypes.STRING
    }
},{
    timestamps: true
});