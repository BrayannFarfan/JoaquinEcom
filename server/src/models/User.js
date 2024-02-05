import { DataTypes } from "sequelize";
import { db } from "../config/dbConfig.js";


export const User = db.define('users', {
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    isAdmin:{
        type: DataTypes.BOOLEAN
    }
},{
    timestamps: true
})