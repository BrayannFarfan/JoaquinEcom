import { DataTypes } from "sequelize";
import { db } from "../config/dbConfig.js";

export const Category = db.define('categories', {
    name: {
        type: DataTypes.STRING
    }
},{
    timestamps: true
})