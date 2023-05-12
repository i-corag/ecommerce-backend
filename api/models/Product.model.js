import { DataTypes } from 'sequelize';
import { db } from '../database/db.config.js';
import Category from './Category.model.js';
import Brand from './Brand.model.js';

const Product = db.define('Product', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

//ASSOCIATION CATEGOTY-PRODUCT (ONE TO MANY)
Category.hasMany(Product);
Product.belongsTo(Category, {
  allowNull: false,
});

//ASSOCIATION BRAND-PRODUCT (ONE TO MANY)
Brand.hasMany(Product);
Product.belongsTo(Brand, {
  allowNull: false,
});

export default Product;
