import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: process.env.DB_PORT,
  }
);

const testDB = async () => {
  try {
    await db.authenticate();
    //await db.sync();
    //console.log('Successfully connected to database');
  } catch (err) {
    //console.log('Unable to connect to database');
    console.error(err);
  }
};

export { db, testDB };
