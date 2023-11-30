const express = require('express');
const router = express.Router();

const Seller = require('./models/sellerModel'); // Adjust the path as per your project structure
const Product = require('./models/productModel'); // Assuming you have a Product model

// POST /seller - Create a new seller
router.post('/seller', async (req, res) => {
  try {
      const seller = new Seller(req.body);
      await seller.save();
      res.status(201).send(seller);
  } catch (error) {
      res.status(400).send(error);
  }
});

// GET /seller - Get all sellers
// POST /seller/:sellerId/product - Add a new product
router.post('/seller/:sellerId/product', async (req, res) => {
  try {
      const seller = await Seller.findById(req.params.sellerId);
      if (!seller) {
          return res.status(404).send();
      }
      const product = new Product({ ...req.body, sellerId: seller._id });
      await product.save();
      res.status(201).send(product);
  } catch (error) {
      res.status(400).send(error);
  }
});

// POST /seller/:sellerId/product - Add a new product
router.post('/seller/:sellerId/product', async (req, res) => {
  try {
      const seller = await Seller.findById(req.params.sellerId);
      if (!seller) {
          return res.status(404).send();
      }
      const product = new Product({ ...req.body, sellerId: seller._id });
      await product.save();
      res.status(201).send(product);
  } catch (error) {
      res.status(400).send(error);
  }
});

// GET /seller/:sellerId/products - Get all products for a seller
router.get('/seller/:sellerId/products', async (req, res) => {
  try {
      const seller = await Seller.findById(req.params.sellerId).populate('products');
      if (!seller) {
          return res.status(404).send();
      }
      res.send(seller.products);
  } catch (error) {
      res.status(500).send(error);
  }
});


// PATCH /seller/:sellerId/product/:productId - Update a product
router.patch('/seller/:sellerId/product/:productId', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['productName', 'price', 'quantity']; // Add other updatable fields
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
      const product = await Product.findOne({ _id: req.params.productId, sellerId: req.params.sellerId });

      if (!product) {
          return res.status(404).send();
      }

      updates.forEach((update) => product[update] = req.body[update]);
      await product.save();
      res.send(product);
  } catch (error) {
      res.status(400).send(error);
  }
});

// DELETE /seller/:sellerId/product/:productId - Delete a product
router.delete('/seller/:sellerId/product/:productId', async (req, res) => {
  try {
      const product = await Product.findOneAndDelete({ _id: req.params.productId, sellerId: req.params.sellerId });
      if (!product) {
          res.status(404).send();
      }
      res.send(product);
  } catch (error) {
      res.status(500).send();
  }
});

