import { DataTypes } from 'sequelize';
import { db } from '../database/db.config.js';
import Product from './Product.model.js';

const Stock = db.define('Stock', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  stock: {
    type: DataTypes.INTEGER,
  },
});

//ASSOCIATION PRODUCT-STOCK (ONE TO ONE)
Product.hasOne(Stock);
Stock.belongsTo(Product, {
  allowNull: false,
});

export default Stock;
