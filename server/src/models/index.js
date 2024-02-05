import { User } from "./User.js";
import { Products } from "./Products.js";
import { Order } from "./Order.js";
import { Color } from './Color.js';
import { Highs } from './Highs.js'
import { ProductColorHigh } from './ProductColorHigh.js'


// Order.belongsToMany(Products, { through: 'OrderProducts', foreignKey: 'orderId' });
// Products.belongsToMany(Order, { through: 'OrderProducts', foreignKey: 'productId' });

// Order.hasMany(Products, { foreignKey: 'orderId' });
// Products.belongsTo(Order);

Order.belongsToMany(Products, { through: 'OrderProducts' });
Products.belongsToMany(Order, { through: 'OrderProducts' });


ProductColorHigh.belongsTo(Products, { foreignKey: 'productId' });
ProductColorHigh.belongsTo(Color, { foreignKey: 'colorId' });
ProductColorHigh.belongsTo(Highs, { foreignKey: 'highId' });

Products.hasMany(ProductColorHigh, { foreignKey: 'productId' });
Color.hasMany(ProductColorHigh, { foreignKey: 'colorId' });
Highs.hasMany(ProductColorHigh, { foreignKey: 'highId' });

// Color.hasMany(Products, { foreignKey: 'colorId' });
// Products.belongsTo(Color, { foreignKey: 'colorId' });


// Highs.hasMany(Products, { foreignKey: 'highId' });
// Products.belongsTo(Highs, { foreignKey: 'highId' });

User.hasMany(Order);
Order.belongsTo(User,{ foreignKey: 'userId' });

User.sync();
Products.sync();
Order.sync();
Color.sync();
Highs.sync();
ProductColorHigh.sync();
