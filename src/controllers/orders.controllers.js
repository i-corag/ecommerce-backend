import orderService from '../services/orders.services.js';

//CREATE ORDER
const createOrder = async (req, res) => {
  const order = req.body;
  try {
    const createdOrder = await orderService.createOrder(order);
    return res
      .status(201)
      .send({ message: 'Order Successfuly Created', createdOrder });
  } catch (err) {
    return res.status(500).send({ message: `Server error: ${err.message}` });
  }
};

//READ ALL ORDERS
const getOrders = async (req, res) => {
  try {
    const orders = await orderService.getOrders();
    return res.status(201).json(orders);
  } catch (err) {
    return res.status(500).send({ message: `Server error: ${err.message}` });
  }
};

//READ ONE ORDER
const getOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await orderService.getOrder(id);
    if (!order) {
      return res
        .status(409)
        .send({ message: `The order ID: "${id}" does not exist` });
    }
    return res.status(201).send(order);
  } catch (err) {
    return res.status(500).send({ message: `Server error: ${err.message}` });
  }
};

//UPDATE ORDER
const updateOrder = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const updatedOrder = await orderService.updateOrder(id, body);
    if (!updatedOrder) {
      return res
        .status(409)
        .send({ message: `The order ID: "${id}" does not exist` });
    }
    return res.status(201).send({ message: `Order successfully updated` });
  } catch (err) {
    return res.status(500).send({ message: `Server error: ${err.message}` });
  }
};

//DELETE ORDER
const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedOrder = await orderService.deleteOrder(id);
    if (!deletedOrder) {
      return res
        .status(409)
        .send({ message: `The order ID: "${id}" does not exist` });
    }
    return res
      .status(201)
      .send({ message: `The order: "${id}" was successfully deleted` });
  } catch (err) {
    return res.status(500).send({ message: `Server error: ${err.message}` });
  }
};

export { createOrder, getOrders, getOrder, updateOrder, deleteOrder };
