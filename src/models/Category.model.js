import { DataTypes } from 'sequelize';
import { db } from '../database/db.config.js';
import Brand from './Brand.model.js';

const Category = db.define('Category', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

//ASSOCIATION BRAND-CATEGORY (MANY TO MANY)
Category.belongsToMany(Brand, {
  through: 'brand_category',
  as: 'brands',
  foreignKey: 'categoryId',
});
Brand.belongsToMany(Category, {
  through: 'brand_category',
  as: 'categories',
  foreingKey: 'brandId',
});

export default Category;
