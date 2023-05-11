import { DataTypes } from 'sequelize';
import { db } from '../database/db.config.js';

const Brand = db.define('Brand', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Brand;
