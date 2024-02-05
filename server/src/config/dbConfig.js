import sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export const db = new sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})


try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
} catch ( error ) {
    console.log( 'Unable to connect to the database:', error )
}