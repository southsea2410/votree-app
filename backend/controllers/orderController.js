const orderModel = require('../models/orderModel');

exports.createOrder = async (req, res) => {
  try {
    const newOrderData = await orderModel.create(req.body);

    const newOrder = await new orderModel(newOrderData);
    await newOrder.save();

    res.status(201).json({
      status: 'success',
      data: {
        newOrder,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.status(200).json({
      status: 'success',
      data: {
        orders,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        order,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getOrdersForSeller = async (req, res) => {
  try {
    const orders = await orderModel.find({ sellerId: req.params.sellerId });
    res.status(200).json({
      status: 'success',
      data: {
        orders,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

// Update orders has 2 types, one for user and one for seller
exports.updateOrderForUser = async (req, res) => {
  try {
    const allowedUpdates = [
      'address',
      'city',
      'postalCode',
      'country',
      'paymentMethods',
    ];
    const updates = Object.keys(req.body);

    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update),
    );
    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }

    const order = await orderModel.findById(req.params.id);
    if (!order) {
      return res.status(404).send();
    }

    updates.forEach((update) => (order[update] = req.body[update]));
    await order.save();
    res.status(200).send(order);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateOrderForSeller = async (req, res) => {
  try {
    const allowedUpdates = ['status'];
    const updates = Object.keys(req.body);

    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update),
    );
    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }

    const order = await orderModel.findById(req.params.id);
    if (!order) {
      return res.status(404).send();
    }

    updates.forEach((update) => (order[update] = req.body[update]));
    await order.save();
    res.status(200).send(order);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await orderModel.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
