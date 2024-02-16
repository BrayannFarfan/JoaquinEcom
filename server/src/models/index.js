import { User } from "./User.js";
import { Products } from "./Products.js";
import { Order } from "./Order.js";
import { Color } from './Color.js';
import { Highs } from './Highs.js'

Order.belongsToMany(Products, { through: 'OrderProducts' });
Products.belongsToMany(Order, { through: 'OrderProducts' });

Products.hasMany(Highs, {
    foreignKey: 'productoId',
    as: 'highs',
  });
  
  Highs.belongsTo(Products, {
    foreignKey: 'productoId',
    as: 'product',
  });
  
  Highs.hasMany(Color, {
    foreignKey: 'highId',
    as: 'colors',
  });
  
  Color.belongsTo(Highs, {
    foreignKey: 'highId',
    as: 'high',
  });
  


User.hasMany(Order);
Order.belongsTo(User,{ foreignKey: 'userId' });

User.sync();
Products.sync();
Order.sync();
Color.sync();
Highs.sync();
