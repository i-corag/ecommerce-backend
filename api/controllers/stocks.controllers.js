import stockService from '../services/stocks.services.js';

//CREATE STOCK
const createStock = async (req, res) => {
  const stock = req.body;
  try {
    const createdStock = await stockService.createStock(stock);
    return res
      .status(201)
      .send({ message: 'Stock Successfuly Created', createdStock });
  } catch (err) {
    return res.status(500).send({ message: `Server error: ${err.message}` });
  }
};

//READ ALL STOCKS
const getStocks = async (req, res) => {
  try {
    const stocks = await stockService.getStocks();
    return res.status(201).send(stocks);
  } catch (err) {
    return res.status(500).send({ message: `Server error: ${err.message}` });
  }
};

//READ ONE STOCK
const getStock = async (req, res) => {
  const { id } = req.params;
  try {
    const stock = await stockService.getStock(id);
    if (!stock) {
      return res
        .status(409)
        .send({ message: `The stock ID: "${id}" does not exist` });
    }
    return res.status(201).send(stock);
  } catch (err) {
    return res.status(500).send({ message: `Server error: ${err.message}` });
  }
};

//UPDATE STOCK
const updateStock = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const updatedStock = await stockService.updateStock(id, body);
    if (!updatedStock) {
      return res
        .status(409)
        .send({ message: `The stock ID: "${id}" does not exist` });
    }
    return res.status(201).send(updatedStock);
  } catch (err) {
    return res.status(500).send({ message: `Server error: ${err.message}` });
  }
};

//DELETE STOCK
const deleteStock = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedStock = await stockService.deleteStock(id);
    if (!deletedStock) {
      return res
        .status(409)
        .send({ message: `The stock ID: "${id}" does not exist` });
    }
    return res.status(201).send({
      message: `The stock: "${deletedStock.id}" was successfully deleted`,
    });
  } catch (err) {
    return res.status(500).send({ message: `Server error: ${err.message}` });
  }
};

export { createStock, getStocks, getStock, updateStock, deleteStock };
