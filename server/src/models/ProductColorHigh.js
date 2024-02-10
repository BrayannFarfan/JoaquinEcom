import { DataTypes } from 'sequelize';
import { db } from '../config/dbConfig.js';

export const ProductColorHigh = db.define('ProductColorHigh', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }
  },{
    timestamps: false
  });