import crypto from 'crypto';
import Stock from '../models/Stock.model.js';

const createStock = async (stock) => {
  let newStock = await Stock.findAll({
    where: { ProductId: stock.ProductId },
  });
  if (newStock.length > 0) {
    const error = {
      message: `The product "${stock.ProductId}" is already in the stock`,
    };
    return error;
  } else {
    const id = crypto.randomBytes(10).toString('hex');
    newStock = {
      id,
      ...stock,
    };
    await Stock.create(newStock);
    return newStock;
  }
};

const getStocks = async () => {
  const allStocks = await Stock.findAll();
  return allStocks;
};

const getStock = async (id) => {
  const productStock = await Stock.findAll({
    where: { ProductId: id },
  });
  return productStock;
};

const updateStock = async (id, body) => {
  let updatedStock = await getStock(body.ProductId);
  if (updatedStock.length === 0) {
    const error = {
      message: `The product "${body.ProductId.name}" is not in the stock`,
    };
    return error;
  }
  updatedStock = await Stock.update(
    { stock: body.stock },
    { where: { ProductId: body.ProductId } }
  );
  return updatedStock;
};

const deleteStock = async (id) => {
  let stock = await getStock(id);
  if (stock) {
    await Stock.destroy({ where: { id } });
  }
  return brand;
};

export default {
  createStock,
  getStocks,
  getStock,
  updateStock,
  deleteStock,
};
